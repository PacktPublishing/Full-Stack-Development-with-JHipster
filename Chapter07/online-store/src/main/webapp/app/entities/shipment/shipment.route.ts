import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ShipmentComponent } from './shipment.component';
import { ShipmentDetailComponent } from './shipment-detail.component';
import { ShipmentPopupComponent } from './shipment-dialog.component';
import { ShipmentDeletePopupComponent } from './shipment-delete-dialog.component';

@Injectable()
export class ShipmentResolvePagingParams implements Resolve<any> {

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

export const shipmentRoute: Routes = [
    {
        path: 'shipment',
        component: ShipmentComponent,
        resolve: {
            'pagingParams': ShipmentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.shipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'shipment/:id',
        component: ShipmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.shipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shipmentPopupRoute: Routes = [
    {
        path: 'shipment-new',
        component: ShipmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.shipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shipment/:id/edit',
        component: ShipmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.shipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shipment/:id/delete',
        component: ShipmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'storeApp.shipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
