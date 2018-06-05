import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AlojamentoComeerjComponent } from './alojamento-comeerj.component';
import { AlojamentoComeerjDetailComponent } from './alojamento-comeerj-detail.component';
import { AlojamentoComeerjPopupComponent } from './alojamento-comeerj-dialog.component';
import { AlojamentoComeerjDeletePopupComponent } from './alojamento-comeerj-delete-dialog.component';

@Injectable()
export class AlojamentoComeerjResolvePagingParams implements Resolve<any> {

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

export const alojamentoRoute: Routes = [
    {
        path: 'alojamento-comeerj',
        component: AlojamentoComeerjComponent,
        resolve: {
            'pagingParams': AlojamentoComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.alojamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alojamento-comeerj/:id',
        component: AlojamentoComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.alojamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alojamentoPopupRoute: Routes = [
    {
        path: 'alojamento-comeerj-new',
        component: AlojamentoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.alojamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alojamento-comeerj/:id/edit',
        component: AlojamentoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.alojamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alojamento-comeerj/:id/delete',
        component: AlojamentoComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.alojamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
