import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrderItem } from './order-item.model';
import { OrderItemPopupService } from './order-item-popup.service';
import { OrderItemService } from './order-item.service';
import { Product, ProductService } from '../product';
import { ProductOrder, ProductOrderService } from '../product-order';

@Component({
    selector: 'jhi-order-item-dialog',
    templateUrl: './order-item-dialog.component.html'
})
export class OrderItemDialogComponent implements OnInit {

    orderItem: OrderItem;
    isSaving: boolean;

    products: Product[];

    productorders: ProductOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private productService: ProductService,
        private productOrderService: ProductOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productOrderService.query()
            .subscribe((res: HttpResponse<ProductOrder[]>) => { this.productorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(
                this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrderItem>>) {
        result.subscribe((res: HttpResponse<OrderItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrderItem) {
        this.eventManager.broadcast({ name: 'orderItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackProductOrderById(index: number, item: ProductOrder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-order-item-popup',
    template: ''
})
export class OrderItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component, params['id']);
            } else {
                this.orderItemPopupService
                    .open(OrderItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
