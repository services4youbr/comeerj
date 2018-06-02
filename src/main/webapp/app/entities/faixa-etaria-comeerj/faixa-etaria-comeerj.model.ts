import { BaseEntity } from './../../shared';

export class FaixaEtariaComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public idadeMin?: number,
        public idadeMaxima?: number,
        public descricao?: string,
        public turmas?: BaseEntity[],
    ) {
    }
}
