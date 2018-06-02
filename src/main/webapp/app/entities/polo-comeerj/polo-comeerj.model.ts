import { BaseEntity } from './../../shared';

export class PoloComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public numero?: string,
        public reunir?: string,
        public localizacao?: string,
        public inscricoes?: BaseEntity[],
    ) {
    }
}
