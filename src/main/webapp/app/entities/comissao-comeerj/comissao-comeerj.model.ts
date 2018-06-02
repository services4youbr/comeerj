import { BaseEntity } from './../../shared';

export class ComissaoComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public comissao?: string,
        public nome?: string,
        public descricao?: string,
        public inscricoes?: BaseEntity[],
    ) {
    }
}
