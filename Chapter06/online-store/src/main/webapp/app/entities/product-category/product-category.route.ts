import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryPopupComponent } from './product-category-dialog.component';
import { ProductCategoryDeletePopupComponent } from './product-category-delete-dialog.component';

export const productCategoryRoute: Routes = [
    {
        path: 'product-category',
        component: ProductCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-category/:id',
        component: ProductCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCategoryPopupRoute: Routes = [
    {
        path: 'product-category-new',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/edit',
        component: ProductCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-category/:id/delete',
        component: ProductCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
