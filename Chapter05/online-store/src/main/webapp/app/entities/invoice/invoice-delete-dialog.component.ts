import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { InvoicePopupService } from './invoice-popup.service';
import { InvoiceService } from './invoice.service';

@Component({
    selector: 'jhi-invoice-delete-dialog',
    templateUrl: './invoice-delete-dialog.component.html'
})
export class InvoiceDeleteDialogComponent {

    invoice: Invoice;

    constructor(
        private invoiceService: InvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceListModification',
                content: 'Deleted an invoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-delete-popup',
    template: ''
})
export class InvoiceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoicePopupService: InvoicePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoicePopupService
                .open(InvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
