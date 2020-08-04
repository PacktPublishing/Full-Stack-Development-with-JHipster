import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerPopupComponent } from './customer-dialog.component';
import { CustomerDeletePopupComponent } from './customer-delete-dialog.component';

@Injectable()
export class CustomerResolvePagingParams implements Resolve<any> {

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

export const customerRoute: Routes = [
    {
        path: 'customer',
        component: CustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer/:id',
        component: CustomerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-new',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/edit',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer/:id/delete',
        component: CustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
