import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    TurmaComeerjService,
    TurmaComeerjPopupService,
    TurmaComeerjComponent,
    TurmaComeerjDetailComponent,
    TurmaComeerjDialogComponent,
    TurmaComeerjPopupComponent,
    TurmaComeerjDeletePopupComponent,
    TurmaComeerjDeleteDialogComponent,
    turmaRoute,
    turmaPopupRoute,
    TurmaComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...turmaRoute,
    ...turmaPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TurmaComeerjComponent,
        TurmaComeerjDetailComponent,
        TurmaComeerjDialogComponent,
        TurmaComeerjDeleteDialogComponent,
        TurmaComeerjPopupComponent,
        TurmaComeerjDeletePopupComponent,
    ],
    entryComponents: [
        TurmaComeerjComponent,
        TurmaComeerjDialogComponent,
        TurmaComeerjPopupComponent,
        TurmaComeerjDeleteDialogComponent,
        TurmaComeerjDeletePopupComponent,
    ],
    providers: [
        TurmaComeerjService,
        TurmaComeerjPopupService,
        TurmaComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjTurmaComeerjModule {}
