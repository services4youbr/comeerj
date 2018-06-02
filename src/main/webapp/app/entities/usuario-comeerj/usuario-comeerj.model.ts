import { BaseEntity } from './../../shared';

export const enum Perfil {
    'ADMINISTRADOR',
    'COORDENADOR',
    'USUARIO'
}

export const enum Genero {
    'MASCULINO',
    'FEMININO'
}

export class UsuarioComeerj implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public name?: string,
        public email?: string,
        public perfil?: Perfil,
        public genero?: Genero,
        public inscricoes?: BaseEntity[],
    ) {
    }
}
