import { BaseEntity } from './../../shared';

export class EventoComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public versao?: string,
        public tema?: string,
        public inicioEvento?: any,
        public fimEvento?: any,
        public inicioInscricoes?: any,
        public fimInscricoes?: any,
        public inscricoes?: BaseEntity[],
    ) {
    }
}
