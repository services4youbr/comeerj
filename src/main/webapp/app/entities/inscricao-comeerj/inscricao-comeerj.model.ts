import { BaseEntity } from './../../shared';

export const enum TipoParticicao {
    'CONFRATERNISTA',
    'TRABALHADOR',
    'PEQUENOS_COMPANHEIROS',
    'PAIS',
    'TAREFEIROS_DO_BEM'
}

export class InscricaoComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public tipoParticipacao?: TipoParticicao,
        public idade?: number,
        public numeroParticipacoes?: number,
        public alojamentoResponsavelId?: number,
        public poloId?: number,
        public eventoId?: number,
        public comissaoId?: number,
        public usuarioId?: number,
        public turmaId?: number,
        public responsavelId?: number,
        public alojamentoId?: number,
    ) {
    }
}
