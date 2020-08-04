import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Notification } from './notification.model';
import { NotificationService } from './notification.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
notifications: Notification[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notificationService: NotificationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.notificationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notifications = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Notification) {
        return item.id;
    }
    registerChangeInNotifications() {
        this.eventSubscriber = this.eventManager.subscribe('notificationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
