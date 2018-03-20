import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayProductModule } from './product/product.module';
import { GatewayProductCategoryModule } from './product-category/product-category.module';
import { GatewayCustomerModule } from './customer/customer.module';
import { GatewayProductOrderModule } from './product-order/product-order.module';
import { GatewayOrderItemModule } from './order-item/order-item.module';
import { GatewayNotificationModule } from './notification/notification.module';
import { GatewayInvoiceModule } from './invoice/invoice.module';
import { GatewayShipmentModule } from './shipment/shipment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayProductModule,
        GatewayProductCategoryModule,
        GatewayCustomerModule,
        GatewayProductOrderModule,
        GatewayOrderItemModule,
        GatewayNotificationModule,
        GatewayInvoiceModule,
        GatewayShipmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
