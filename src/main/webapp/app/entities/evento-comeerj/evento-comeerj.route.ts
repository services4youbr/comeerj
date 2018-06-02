import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EventoComeerjComponent } from './evento-comeerj.component';
import { EventoComeerjDetailComponent } from './evento-comeerj-detail.component';
import { EventoComeerjPopupComponent } from './evento-comeerj-dialog.component';
import { EventoComeerjDeletePopupComponent } from './evento-comeerj-delete-dialog.component';

@Injectable()
export class EventoComeerjResolvePagingParams implements Resolve<any> {

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

export const eventoRoute: Routes = [
    {
        path: 'evento-comeerj',
        component: EventoComeerjComponent,
        resolve: {
            'pagingParams': EventoComeerjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evento-comeerj/:id',
        component: EventoComeerjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventoPopupRoute: Routes = [
    {
        path: 'evento-comeerj-new',
        component: EventoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento-comeerj/:id/edit',
        component: EventoComeerjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evento-comeerj/:id/delete',
        component: EventoComeerjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eventos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
