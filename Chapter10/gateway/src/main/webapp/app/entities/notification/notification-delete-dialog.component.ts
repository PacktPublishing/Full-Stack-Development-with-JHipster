import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Notification } from './notification.model';
import { NotificationPopupService } from './notification-popup.service';
import { NotificationService } from './notification.service';

@Component({
    selector: 'jhi-notification-delete-dialog',
    templateUrl: './notification-delete-dialog.component.html'
})
export class NotificationDeleteDialogComponent {

    notification: Notification;

    constructor(
        private notificationService: NotificationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificationListModification',
                content: 'Deleted an notification'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-delete-popup',
    template: ''
})
export class NotificationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationPopupService: NotificationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificationPopupService
                .open(NotificationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
