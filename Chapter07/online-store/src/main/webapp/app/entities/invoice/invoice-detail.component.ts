import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
    selector: 'jhi-invoice-detail',
    templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {

    invoice: Invoice;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceService: InvoiceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoices();
    }

    load(id) {
        this.invoiceService.find(id)
            .subscribe((invoiceResponse: HttpResponse<Invoice>) => {
                this.invoice = invoiceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceListModification',
            (response) => this.load(this.invoice.id)
        );
    }
}
