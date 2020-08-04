import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ProductOrderService } from './product-order.service';

@Component({
    selector: 'jhi-product-order-detail',
    templateUrl: './product-order-detail.component.html'
})
export class ProductOrderDetailComponent implements OnInit, OnDestroy {

    productOrder: ProductOrder;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productOrderService: ProductOrderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductOrders();
    }

    load(id) {
        this.productOrderService.find(id)
            .subscribe((productOrderResponse: HttpResponse<ProductOrder>) => {
                this.productOrder = productOrderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productOrderListModification',
            (response) => this.load(this.productOrder.id)
        );
    }
}
