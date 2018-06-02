import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComeerjUsuarioComeerjModule } from './usuario-comeerj/usuario-comeerj.module';
import { ComeerjEventoComeerjModule } from './evento-comeerj/evento-comeerj.module';
import { ComeerjInscricaoComeerjModule } from './inscricao-comeerj/inscricao-comeerj.module';
import { ComeerjComissaoComeerjModule } from './comissao-comeerj/comissao-comeerj.module';
import { ComeerjPoloComeerjModule } from './polo-comeerj/polo-comeerj.module';
import { ComeerjFaixaEtariaComeerjModule } from './faixa-etaria-comeerj/faixa-etaria-comeerj.module';
import { ComeerjTurmaComeerjModule } from './turma-comeerj/turma-comeerj.module';
import { ComeerjAlojamentoComeerjModule } from './alojamento-comeerj/alojamento-comeerj.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ComeerjUsuarioComeerjModule,
        ComeerjEventoComeerjModule,
        ComeerjInscricaoComeerjModule,
        ComeerjComissaoComeerjModule,
        ComeerjPoloComeerjModule,
        ComeerjFaixaEtariaComeerjModule,
        ComeerjTurmaComeerjModule,
        ComeerjAlojamentoComeerjModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeerjEntityModule {}
