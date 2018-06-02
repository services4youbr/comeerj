import { BaseEntity } from './../../shared';

export class TurmaComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public inscritos?: BaseEntity[],
        public evangelizadores?: BaseEntity[],
        public faixaEtariaId?: number,
    ) {
    }
}
