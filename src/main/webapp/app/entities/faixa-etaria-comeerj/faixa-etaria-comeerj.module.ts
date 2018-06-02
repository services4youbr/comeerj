import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    FaixaEtariaComeerjService,
    FaixaEtariaComeerjPopupService,
    FaixaEtariaComeerjComponent,
    FaixaEtariaComeerjDetailComponent,
    FaixaEtariaComeerjDialogComponent,
    FaixaEtariaComeerjPopupComponent,
    FaixaEtariaComeerjDeletePopupComponent,
    FaixaEtariaComeerjDeleteDialogComponent,
    faixaEtariaRoute,
    faixaEtariaPopupRoute,
    FaixaEtariaComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...faixaEtariaRoute,
    ...faixaEtariaPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FaixaEtariaComeerjComponent,
        FaixaEtariaComeerjDetailComponent,
        FaixaEtariaComeerjDialogComponent,
        FaixaEtariaComeerjDeleteDialogComponent,
        FaixaEtariaComeerjPopupComponent,
        FaixaEtariaComeerjDeletePopupComponent,
    ],
    entryComponents: [
        FaixaEtariaComeerjComponent,
        FaixaEtariaComeerjDialogComponent,
        FaixaEtariaComeerjPopupComponent,
        FaixaEtariaComeerjDeleteDialogComponent,
        FaixaEtariaComeerjDeletePopupComponent,
    ],
    providers: [
        FaixaEtariaComeerjService,
        FaixaEtariaComeerjPopupService,
        FaixaEtariaComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjFaixaEtariaComeerjModule {}
