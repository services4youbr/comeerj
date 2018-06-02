import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PoloComeerjComponent } from './polo-comeerj.component';
import { PoloComeerjDetailComponent } from './polo-comeerj-detail.component';
import { PoloComeerjPopupComponent } from './polo-comeerj-dialog.component';
import { PoloComeerjDeletePopupComponent } from './polo-comeerj-delete-dialog.component';

@Injectable()
export class PoloComeerjResolvePagingParams implements Resolve<any> {

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

export const poloRoute: Routes = [
    {
        path: 'polo-comeerj',
        component: PoloComeerjComponent,
        resolve: {
            'pagingParams': PoloComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Polos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'polo-comeerj/:id',
        component: PoloComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Polos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const poloPopupRoute: Routes = [
    {
        path: 'polo-comeerj-new',
        component: PoloComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Polos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'polo-comeerj/:id/edit',
        component: PoloComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Polos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'polo-comeerj/:id/delete',
        component: PoloComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Polos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
