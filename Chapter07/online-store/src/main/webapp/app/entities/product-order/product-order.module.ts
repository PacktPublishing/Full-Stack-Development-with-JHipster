import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    ProductOrderService,
    ProductOrderPopupService,
    ProductOrderComponent,
    ProductOrderDetailComponent,
    ProductOrderDialogComponent,
    ProductOrderPopupComponent,
    ProductOrderDeletePopupComponent,
    ProductOrderDeleteDialogComponent,
    productOrderRoute,
    productOrderPopupRoute,
    ProductOrderResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productOrderRoute,
    ...productOrderPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductOrderComponent,
        ProductOrderDetailComponent,
        ProductOrderDialogComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderPopupComponent,
        ProductOrderDeletePopupComponent,
    ],
    entryComponents: [
        ProductOrderComponent,
        ProductOrderDialogComponent,
        ProductOrderPopupComponent,
        ProductOrderDeleteDialogComponent,
        ProductOrderDeletePopupComponent,
    ],
    providers: [
        ProductOrderService,
        ProductOrderPopupService,
        ProductOrderResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreProductOrderModule {}
