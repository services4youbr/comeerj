import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InscricaoComeerjComponent } from './inscricao-comeerj.component';
import { InscricaoComeerjDetailComponent } from './inscricao-comeerj-detail.component';
import { InscricaoComeerjPopupComponent } from './inscricao-comeerj-dialog.component';
import { InscricaoComeerjDeletePopupComponent } from './inscricao-comeerj-delete-dialog.component';

@Injectable()
export class InscricaoComeerjResolvePagingParams implements Resolve<any> {

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

export const inscricaoRoute: Routes = [
    {
        path: 'inscricao-comeerj',
        component: InscricaoComeerjComponent,
        resolve: {
            'pagingParams': InscricaoComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.inscricao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inscricao-comeerj/:id',
        component: InscricaoComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.inscricao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inscricaoPopupRoute: Routes = [
    {
        path: 'inscricao-comeerj-new',
        component: InscricaoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.inscricao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscricao-comeerj/:id/edit',
        component: InscricaoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.inscricao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscricao-comeerj/:id/delete',
        component: InscricaoComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.inscricao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
