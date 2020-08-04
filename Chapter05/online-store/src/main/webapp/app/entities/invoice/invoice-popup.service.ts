import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Injectable()
export class InvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceService: InvoiceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.invoiceService.find(id).subscribe((invoice) => {
                    invoice.date = this.datePipe
                        .transform(invoice.date, 'yyyy-MM-ddTHH:mm:ss');
                    invoice.paymentDate = this.datePipe
                        .transform(invoice.paymentDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.invoiceModalRef(component, invoice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceModalRef(component, new Invoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceModalRef(component: Component, invoice: Invoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoice = invoice;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
