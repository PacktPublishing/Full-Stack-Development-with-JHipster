import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Shipment } from './shipment.model';
import { ShipmentPopupService } from './shipment-popup.service';
import { ShipmentService } from './shipment.service';
import { Invoice, InvoiceService } from '../invoice';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-shipment-dialog',
    templateUrl: './shipment-dialog.component.html'
})
export class ShipmentDialogComponent implements OnInit {

    shipment: Shipment;
    isSaving: boolean;

    invoices: Invoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shipmentService: ShipmentService,
        private invoiceService: InvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService.query()
            .subscribe((res: ResponseWrapper) => { this.invoices = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.shipment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shipmentService.update(this.shipment));
        } else {
            this.subscribeToSaveResponse(
                this.shipmentService.create(this.shipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<Shipment>) {
        result.subscribe((res: Shipment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Shipment) {
        this.eventManager.broadcast({ name: 'shipmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-shipment-popup',
    template: ''
})
export class ShipmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shipmentPopupService: ShipmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shipmentPopupService
                    .open(ShipmentDialogComponent as Component, params['id']);
            } else {
                this.shipmentPopupService
                    .open(ShipmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
