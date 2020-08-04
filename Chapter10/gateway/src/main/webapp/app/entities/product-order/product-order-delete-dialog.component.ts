import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ProductOrderPopupService } from './product-order-popup.service';
import { ProductOrderService } from './product-order.service';

@Component({
    selector: 'jhi-product-order-delete-dialog',
    templateUrl: './product-order-delete-dialog.component.html'
})
export class ProductOrderDeleteDialogComponent {

    productOrder: ProductOrder;

    constructor(
        private productOrderService: ProductOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productOrderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productOrderListModification',
                content: 'Deleted an productOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-order-delete-popup',
    template: ''
})
export class ProductOrderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productOrderPopupService: ProductOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productOrderPopupService
                .open(ProductOrderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
