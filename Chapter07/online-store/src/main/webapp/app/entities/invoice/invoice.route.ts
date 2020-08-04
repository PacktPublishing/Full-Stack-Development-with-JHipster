import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './invoice-detail.component';
import { InvoicePopupComponent } from './invoice-dialog.component';
import { InvoiceDeletePopupComponent } from './invoice-delete-dialog.component';

@Injectable()
export class InvoiceResolvePagingParams implements Resolve<any> {

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

export const invoiceRoute: Routes = [
    {
        path: 'invoice',
        component: InvoiceComponent,
        resolve: {
            'pagingParams': InvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice/:id',
        component: InvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePopupRoute: Routes = [
    {
        path: 'invoice-new',
        component: InvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice/:id/edit',
        component: InvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice/:id/delete',
        component: InvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
