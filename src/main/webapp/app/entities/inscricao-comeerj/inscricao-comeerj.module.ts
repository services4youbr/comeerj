import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    InscricaoComeerjService,
    InscricaoComeerjPopupService,
    InscricaoComeerjComponent,
    InscricaoComeerjDetailComponent,
    InscricaoComeerjDialogComponent,
    InscricaoComeerjPopupComponent,
    InscricaoComeerjDeletePopupComponent,
    InscricaoComeerjDeleteDialogComponent,
    inscricaoRoute,
    inscricaoPopupRoute,
    InscricaoComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...inscricaoRoute,
    ...inscricaoPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InscricaoComeerjComponent,
        InscricaoComeerjDetailComponent,
        InscricaoComeerjDialogComponent,
        InscricaoComeerjDeleteDialogComponent,
        InscricaoComeerjPopupComponent,
        InscricaoComeerjDeletePopupComponent,
    ],
    entryComponents: [
        InscricaoComeerjComponent,
        InscricaoComeerjDialogComponent,
        InscricaoComeerjPopupComponent,
        InscricaoComeerjDeleteDialogComponent,
        InscricaoComeerjDeletePopupComponent,
    ],
    providers: [
        InscricaoComeerjService,
        InscricaoComeerjPopupService,
        InscricaoComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjInscricaoComeerjModule {}
