import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeerjSharedModule } from '../../shared';
import {
    PoloComeerjService,
    PoloComeerjPopupService,
    PoloComeerjComponent,
    PoloComeerjDetailComponent,
    PoloComeerjDialogComponent,
    PoloComeerjPopupComponent,
    PoloComeerjDeletePopupComponent,
    PoloComeerjDeleteDialogComponent,
    poloRoute,
    poloPopupRoute,
    PoloComeerjResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...poloRoute,
    ...poloPopupRoute,
];

@NgModule({
    imports: [
        ComeerjSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PoloComeerjComponent,
        PoloComeerjDetailComponent,
        PoloComeerjDialogComponent,
        PoloComeerjDeleteDialogComponent,
        PoloComeerjPopupComponent,
        PoloComeerjDeletePopupComponent,
    ],
    entryComponents: [
        PoloComeerjComponent,
        PoloComeerjDialogComponent,
        PoloComeerjPopupComponent,
        PoloComeerjDeleteDialogComponent,
        PoloComeerjDeletePopupComponent,
    ],
    providers: [
        PoloComeerjService,
        PoloComeerjPopupService,
        PoloComeerjResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjPoloComeerjModule {}
