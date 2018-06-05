import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UsuarioComeerjComponent } from './usuario-comeerj.component';
import { UsuarioComeerjDetailComponent } from './usuario-comeerj-detail.component';
import { UsuarioComeerjPopupComponent } from './usuario-comeerj-dialog.component';
import { UsuarioComeerjDeletePopupComponent } from './usuario-comeerj-delete-dialog.component';

@Injectable()
export class UsuarioComeerjResolvePagingParams implements Resolve<any> {

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

export const usuarioRoute: Routes = [
    {
        path: 'usuario-comeerj',
        component: UsuarioComeerjComponent,
        resolve: {
            'pagingParams': UsuarioComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario-comeerj/:id',
        component: UsuarioComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-comeerj-new',
        component: UsuarioComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-comeerj/:id/edit',
        component: UsuarioComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-comeerj/:id/delete',
        component: UsuarioComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeerjApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
