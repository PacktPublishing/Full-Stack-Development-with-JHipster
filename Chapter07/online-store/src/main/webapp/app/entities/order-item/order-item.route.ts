import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrderItemComponent } from './order-item.component';
import { OrderItemDetailComponent } from './order-item-detail.component';
import { OrderItemPopupComponent } from './order-item-dialog.component';
import { OrderItemDeletePopupComponent } from './order-item-delete-dialog.component';

@Injectable()
export class OrderItemResolvePagingParams implements Resolve<any> {

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

export const orderItemRoute: Routes = [
    {
        path: 'order-item',
        component: OrderItemComponent,
        resolve: {
            'pagingParams': OrderItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-item/:id',
        component: OrderItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderItemPopupRoute: Routes = [
    {
        path: 'order-item-new',
        component: OrderItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item/:id/edit',
        component: OrderItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item/:id/delete',
        component: OrderItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
