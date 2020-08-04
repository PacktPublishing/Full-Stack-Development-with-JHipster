import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    OrderItemService,
    OrderItemPopupService,
    OrderItemComponent,
    OrderItemDetailComponent,
    OrderItemDialogComponent,
    OrderItemPopupComponent,
    OrderItemDeletePopupComponent,
    OrderItemDeleteDialogComponent,
    orderItemRoute,
    orderItemPopupRoute,
    OrderItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderItemRoute,
    ...orderItemPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrderItemComponent,
        OrderItemDetailComponent,
        OrderItemDialogComponent,
        OrderItemDeleteDialogComponent,
        OrderItemPopupComponent,
        OrderItemDeletePopupComponent,
    ],
    entryComponents: [
        OrderItemComponent,
        OrderItemDialogComponent,
        OrderItemPopupComponent,
        OrderItemDeleteDialogComponent,
        OrderItemDeletePopupComponent,
    ],
    providers: [
        OrderItemService,
        OrderItemPopupService,
        OrderItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreOrderItemModule {}
