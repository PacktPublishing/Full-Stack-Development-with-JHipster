import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NotificationService,
    NotificationPopupService,
    NotificationComponent,
    NotificationDetailComponent,
    NotificationDialogComponent,
    NotificationPopupComponent,
    NotificationDeletePopupComponent,
    NotificationDeleteDialogComponent,
    notificationRoute,
    notificationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...notificationRoute,
    ...notificationPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificationComponent,
        NotificationDetailComponent,
        NotificationDialogComponent,
        NotificationDeleteDialogComponent,
        NotificationPopupComponent,
        NotificationDeletePopupComponent,
    ],
    entryComponents: [
        NotificationComponent,
        NotificationDialogComponent,
        NotificationPopupComponent,
        NotificationDeleteDialogComponent,
        NotificationDeletePopupComponent,
    ],
    providers: [
        NotificationService,
        NotificationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNotificationModule {}
