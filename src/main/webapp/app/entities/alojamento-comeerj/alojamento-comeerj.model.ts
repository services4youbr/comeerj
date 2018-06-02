import { BaseEntity } from './../../shared';

export const enum Genero {
    'MASCULINO',
    'FEMININO'
}

export class AlojamentoComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public sala?: string,
        public local?: string,
        public genero?: Genero,
        public responsavelId?: number,
        public inscritos?: BaseEntity[],
    ) {
    }
}
