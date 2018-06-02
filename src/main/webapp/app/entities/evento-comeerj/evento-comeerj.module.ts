import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    EventoComeerjService,
    EventoComeerjPopupService,
    EventoComeerjComponent,
    EventoComeerjDetailComponent,
    EventoComeerjDialogComponent,
    EventoComeerjPopupComponent,
    EventoComeerjDeletePopupComponent,
    EventoComeerjDeleteDialogComponent,
    eventoRoute,
    eventoPopupRoute,
    EventoComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...eventoRoute,
    ...eventoPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventoComeerjComponent,
        EventoComeerjDetailComponent,
        EventoComeerjDialogComponent,
        EventoComeerjDeleteDialogComponent,
        EventoComeerjPopupComponent,
        EventoComeerjDeletePopupComponent,
    ],
    entryComponents: [
        EventoComeerjComponent,
        EventoComeerjDialogComponent,
        EventoComeerjPopupComponent,
        EventoComeerjDeleteDialogComponent,
        EventoComeerjDeletePopupComponent,
    ],
    providers: [
        EventoComeerjService,
        EventoComeerjPopupService,
        EventoComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjEventoComeerjModule {}
