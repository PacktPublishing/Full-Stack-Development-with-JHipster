import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StoreProductModule } from './product/product.module';
import { StoreProductCategoryModule } from './product-category/product-category.module';
import { StoreCustomerModule } from './customer/customer.module';
import { StoreProductOrderModule } from './product-order/product-order.module';
import { StoreOrderItemModule } from './order-item/order-item.module';
import { StoreInvoiceModule } from './invoice/invoice.module';
import { StoreShipmentModule } from './shipment/shipment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StoreProductModule,
        StoreProductCategoryModule,
        StoreCustomerModule,
        StoreProductOrderModule,
        StoreOrderItemModule,
        StoreInvoiceModule,
        StoreShipmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreEntityModule {}
