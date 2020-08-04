import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Shipment } from './shipment.model';
import { ShipmentService } from './shipment.service';

@Component({
    selector: 'jhi-shipment-detail',
    templateUrl: './shipment-detail.component.html'
})
export class ShipmentDetailComponent implements OnInit, OnDestroy {

    shipment: Shipment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shipmentService: ShipmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShipments();
    }

    load(id) {
        this.shipmentService.find(id).subscribe((shipment) => {
            this.shipment = shipment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShipments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shipmentListModification',
            (response) => this.load(this.shipment.id)
        );
    }
}
