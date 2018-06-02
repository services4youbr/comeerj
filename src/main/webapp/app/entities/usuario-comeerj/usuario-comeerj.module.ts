import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    UsuarioComeerjService,
    UsuarioComeerjPopupService,
    UsuarioComeerjComponent,
    UsuarioComeerjDetailComponent,
    UsuarioComeerjDialogComponent,
    UsuarioComeerjPopupComponent,
    UsuarioComeerjDeletePopupComponent,
    UsuarioComeerjDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute,
    UsuarioComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioComeerjComponent,
        UsuarioComeerjDetailComponent,
        UsuarioComeerjDialogComponent,
        UsuarioComeerjDeleteDialogComponent,
        UsuarioComeerjPopupComponent,
        UsuarioComeerjDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioComeerjComponent,
        UsuarioComeerjDialogComponent,
        UsuarioComeerjPopupComponent,
        UsuarioComeerjDeleteDialogComponent,
        UsuarioComeerjDeletePopupComponent,
    ],
    providers: [
        UsuarioComeerjService,
        UsuarioComeerjPopupService,
        UsuarioComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjUsuarioComeerjModule {}
