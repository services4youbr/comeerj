import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TurmaComeerjComponent } from './turma-comeerj.component';
import { TurmaComeerjDetailComponent } from './turma-comeerj-detail.component';
import { TurmaComeerjPopupComponent } from './turma-comeerj-dialog.component';
import { TurmaComeerjDeletePopupComponent } from './turma-comeerj-delete-dialog.component';

@Injectable()
export class TurmaComeerjResolvePagingParams implements Resolve<any> {

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

export const turmaRoute: Routes = [
    {
        path: 'turma-comeerj',
        component: TurmaComeerjComponent,
        resolve: {
            'pagingParams': TurmaComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.turma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'turma-comeerj/:id',
        component: TurmaComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.turma.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const turmaPopupRoute: Routes = [
    {
        path: 'turma-comeerj-new',
        component: TurmaComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turma-comeerj/:id/edit',
        component: TurmaComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turma-comeerj/:id/delete',
        component: TurmaComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.turma.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
