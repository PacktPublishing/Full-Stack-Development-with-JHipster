import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ProductOrderPopupService } from './product-order-popup.service';
import { ProductOrderService } from './product-order.service';
import { Customer, CustomerService } from '../customer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-order-dialog',
    templateUrl: './product-order-dialog.component.html'
})
export class ProductOrderDialogComponent implements OnInit {

    productOrder: ProductOrder;
    isSaving: boolean;

    customers: Customer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productOrderService: ProductOrderService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: ResponseWrapper) => { this.customers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productOrderService.update(this.productOrder));
        } else {
            this.subscribeToSaveResponse(
                this.productOrderService.create(this.productOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductOrder>) {
        result.subscribe((res: ProductOrder) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductOrder) {
        this.eventManager.broadcast({ name: 'productOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-order-popup',
    template: ''
})
export class ProductOrderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productOrderPopupService: ProductOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productOrderPopupService
                    .open(ProductOrderDialogComponent as Component, params['id']);
            } else {
                this.productOrderPopupService
                    .open(ProductOrderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
