import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    ComissaoComeerjService,
    ComissaoComeerjPopupService,
    ComissaoComeerjComponent,
    ComissaoComeerjDetailComponent,
    ComissaoComeerjDialogComponent,
    ComissaoComeerjPopupComponent,
    ComissaoComeerjDeletePopupComponent,
    ComissaoComeerjDeleteDialogComponent,
    comissaoRoute,
    comissaoPopupRoute,
    ComissaoComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...comissaoRoute,
    ...comissaoPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComissaoComeerjComponent,
        ComissaoComeerjDetailComponent,
        ComissaoComeerjDialogComponent,
        ComissaoComeerjDeleteDialogComponent,
        ComissaoComeerjPopupComponent,
        ComissaoComeerjDeletePopupComponent,
    ],
    entryComponents: [
        ComissaoComeerjComponent,
        ComissaoComeerjDialogComponent,
        ComissaoComeerjPopupComponent,
        ComissaoComeerjDeleteDialogComponent,
        ComissaoComeerjDeletePopupComponent,
    ],
    providers: [
        ComissaoComeerjService,
        ComissaoComeerjPopupService,
        ComissaoComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjComissaoComeerjModule {}
