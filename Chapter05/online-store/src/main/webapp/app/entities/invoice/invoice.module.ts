import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from '../../shared';
import {
    InvoiceService,
    InvoicePopupService,
    InvoiceComponent,
    InvoiceDetailComponent,
    InvoiceDialogComponent,
    InvoicePopupComponent,
    InvoiceDeletePopupComponent,
    InvoiceDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute,
    InvoiceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceRoute,
    ...invoicePopupRoute,
];

@NgModule({
    imports: [
        StoreSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceComponent,
        InvoiceDetailComponent,
        InvoiceDialogComponent,
        InvoiceDeleteDialogComponent,
        InvoicePopupComponent,
        InvoiceDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceComponent,
        InvoiceDialogComponent,
        InvoicePopupComponent,
        InvoiceDeleteDialogComponent,
        InvoiceDeletePopupComponent,
    ],
    providers: [
        InvoiceService,
        InvoicePopupService,
        InvoiceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreInvoiceModule {}
