import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private notificationService: NotificationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.notificationService.find(id).subscribe((notification) => {
                    notification.date = this.datePipe
                        .transform(notification.date, 'yyyy-MM-ddTHH:mm:ss');
                    notification.sentDate = this.datePipe
                        .transform(notification.sentDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.notificationModalRef(component, notification);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notificationModalRef(component, new Notification());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notificationModalRef(component: Component, notification: Notification): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notification = notification;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
