import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProductOrderComponent } from './product-order.component';
import { ProductOrderDetailComponent } from './product-order-detail.component';
import { ProductOrderPopupComponent } from './product-order-dialog.component';
import { ProductOrderDeletePopupComponent } from './product-order-delete-dialog.component';

@Injectable()
export class ProductOrderResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const productOrderRoute: Routes = [
    {
        path: 'product-order',
        component: ProductOrderComponent,
        resolve: {
            'pagingParams': ProductOrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-order/:id',
        component: ProductOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productOrderPopupRoute: Routes = [
    {
        path: 'product-order-new',
        component: ProductOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-order/:id/edit',
        component: ProductOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-order/:id/delete',
        component: ProductOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.productOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
