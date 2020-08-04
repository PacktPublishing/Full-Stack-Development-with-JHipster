import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Shipment } from './shipment.model';
import { ShipmentPopupService } from './shipment-popup.service';
import { ShipmentService } from './shipment.service';

@Component({
    selector: 'jhi-shipment-delete-dialog',
    templateUrl: './shipment-delete-dialog.component.html'
})
export class ShipmentDeleteDialogComponent {

    shipment: Shipment;

    constructor(
        private shipmentService: ShipmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shipmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'shipmentListModification',
                content: 'Deleted an shipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shipment-delete-popup',
    template: ''
})
export class ShipmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shipmentPopupService: ShipmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shipmentPopupService
                .open(ShipmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
