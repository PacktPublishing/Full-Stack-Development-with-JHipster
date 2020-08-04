import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import { StoreAdminModule } from '../../admin/admin.module';
import {
    CustomerService,
    CustomerPopupService,
    CustomerComponent,
    CustomerDetailComponent,
    CustomerDialogComponent,
    CustomerPopupComponent,
    CustomerDeletePopupComponent,
    CustomerDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        StoreAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerComponent,
        CustomerDetailComponent,
        CustomerDialogComponent,
        CustomerDeleteDialogComponent,
        CustomerPopupComponent,
        CustomerDeletePopupComponent,
    ],
    entryComponents: [
        CustomerComponent,
        CustomerDialogComponent,
        CustomerPopupComponent,
        CustomerDeleteDialogComponent,
        CustomerDeletePopupComponent,
    ],
    providers: [
        CustomerService,
        CustomerPopupService,
        CustomerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreCustomerModule {}
