import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { InvoicePopupService } from './invoice-popup.service';
import { InvoiceService } from './invoice.service';
import { ProductOrder, ProductOrderService } from '../product-order';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-invoice-dialog',
    templateUrl: './invoice-dialog.component.html'
})
export class InvoiceDialogComponent implements OnInit {

    invoice: Invoice;
    isSaving: boolean;

    productorders: ProductOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceService,
        private productOrderService: ProductOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productOrderService.query()
            .subscribe((res: ResponseWrapper) => { this.productorders = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<Invoice>) {
        result.subscribe((res: Invoice) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Invoice) {
        this.eventManager.broadcast({ name: 'invoiceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductOrderById(index: number, item: ProductOrder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-popup',
    template: ''
})
export class InvoicePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoicePopupService
                    .open(InvoiceDialogComponent as Component, params['id']);
            } else {
                this.invoicePopupService
                    .open(InvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
