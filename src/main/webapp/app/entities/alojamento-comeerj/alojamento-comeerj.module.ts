import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    AlojamentoComeerjService,
    AlojamentoComeerjPopupService,
    AlojamentoComeerjComponent,
    AlojamentoComeerjDetailComponent,
    AlojamentoComeerjDialogComponent,
    AlojamentoComeerjPopupComponent,
    AlojamentoComeerjDeletePopupComponent,
    AlojamentoComeerjDeleteDialogComponent,
    alojamentoRoute,
    alojamentoPopupRoute,
    AlojamentoComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...alojamentoRoute,
    ...alojamentoPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlojamentoComeerjComponent,
        AlojamentoComeerjDetailComponent,
        AlojamentoComeerjDialogComponent,
        AlojamentoComeerjDeleteDialogComponent,
        AlojamentoComeerjPopupComponent,
        AlojamentoComeerjDeletePopupComponent,
    ],
    entryComponents: [
        AlojamentoComeerjComponent,
        AlojamentoComeerjDialogComponent,
        AlojamentoComeerjPopupComponent,
        AlojamentoComeerjDeleteDialogComponent,
        AlojamentoComeerjDeletePopupComponent,
    ],
    providers: [
        AlojamentoComeerjService,
        AlojamentoComeerjPopupService,
        AlojamentoComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjAlojamentoComeerjModule {}
