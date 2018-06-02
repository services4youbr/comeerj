import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FaixaEtariaComeerjComponent } from './faixa-etaria-comeerj.component';
import { FaixaEtariaComeerjDetailComponent } from './faixa-etaria-comeerj-detail.component';
import { FaixaEtariaComeerjPopupComponent } from './faixa-etaria-comeerj-dialog.component';
import { FaixaEtariaComeerjDeletePopupComponent } from './faixa-etaria-comeerj-delete-dialog.component';

@Injectable()
export class FaixaEtariaComeerjResolvePagingParams implements Resolve<any> {

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

export const faixaEtariaRoute: Routes = [
    {
        path: 'faixa-etaria-comeerj',
        component: FaixaEtariaComeerjComponent,
        resolve: {
            'pagingParams': FaixaEtariaComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FaixaEtarias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'faixa-etaria-comeerj/:id',
        component: FaixaEtariaComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FaixaEtarias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const faixaEtariaPopupRoute: Routes = [
    {
        path: 'faixa-etaria-comeerj-new',
        component: FaixaEtariaComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FaixaEtarias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'faixa-etaria-comeerj/:id/edit',
        component: FaixaEtariaComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FaixaEtarias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'faixa-etaria-comeerj/:id/delete',
        component: FaixaEtariaComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FaixaEtarias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
