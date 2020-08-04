import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ShipmentService,
    ShipmentPopupService,
    ShipmentComponent,
    ShipmentDetailComponent,
    ShipmentDialogComponent,
    ShipmentPopupComponent,
    ShipmentDeletePopupComponent,
    ShipmentDeleteDialogComponent,
    shipmentRoute,
    shipmentPopupRoute,
    ShipmentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shipmentRoute,
    ...shipmentPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShipmentComponent,
        ShipmentDetailComponent,
        ShipmentDialogComponent,
        ShipmentDeleteDialogComponent,
        ShipmentPopupComponent,
        ShipmentDeletePopupComponent,
    ],
    entryComponents: [
        ShipmentComponent,
        ShipmentDialogComponent,
        ShipmentPopupComponent,
        ShipmentDeleteDialogComponent,
        ShipmentDeletePopupComponent,
    ],
    providers: [
        ShipmentService,
        ShipmentPopupService,
        ShipmentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayShipmentModule {}
