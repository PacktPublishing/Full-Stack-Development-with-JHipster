import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
    selector: 'jhi-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

    customer: Customer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerService: CustomerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomers();
    }

    load(id) {
        this.customerService.find(id)
            .subscribe((customerResponse: HttpResponse<Customer>) => {
                this.customer = customerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerListModification',
            (response) => this.load(this.customer.id)
        );
    }
}
