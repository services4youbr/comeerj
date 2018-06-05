import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComissaoComeerjComponent } from './comissao-comeerj.component';
import { ComissaoComeerjDetailComponent } from './comissao-comeerj-detail.component';
import { ComissaoComeerjPopupComponent } from './comissao-comeerj-dialog.component';
import { ComissaoComeerjDeletePopupComponent } from './comissao-comeerj-delete-dialog.component';

@Injectable()
export class ComissaoComeerjResolvePagingParams implements Resolve<any> {

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

export const comissaoRoute: Routes = [
    {
        path: 'comissao-comeerj',
        component: ComissaoComeerjComponent,
        resolve: {
            'pagingParams': ComissaoComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.comissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comissao-comeerj/:id',
        component: ComissaoComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.comissao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comissaoPopupRoute: Routes = [
    {
        path: 'comissao-comeerj-new',
        component: ComissaoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.comissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comissao-comeerj/:id/edit',
        component: ComissaoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.comissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comissao-comeerj/:id/delete',
        component: ComissaoComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.comissao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
