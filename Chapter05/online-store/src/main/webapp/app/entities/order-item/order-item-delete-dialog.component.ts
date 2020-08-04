import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrderItem } from './order-item.model';
import { OrderItemPopupService } from './order-item-popup.service';
import { OrderItemService } from './order-item.service';

@Component({
    selector: 'jhi-order-item-delete-dialog',
    templateUrl: './order-item-delete-dialog.component.html'
})
export class OrderItemDeleteDialogComponent {

    orderItem: OrderItem;

    constructor(
        private orderItemService: OrderItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderItemListModification',
                content: 'Deleted an orderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-item-delete-popup',
    template: ''
})
export class OrderItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.orderItemPopupService
                .open(OrderItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
