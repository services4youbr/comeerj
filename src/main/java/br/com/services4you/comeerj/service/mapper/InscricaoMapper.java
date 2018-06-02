package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.InscricaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Inscricao and its DTO InscricaoDTO.
 */
@Mapper(componentModel = "spring", uses = {PoloMapper.class, EventoMapper.class, ComissaoMapper.class, UsuarioMapper.class, TurmaMapper.class, AlojamentoMapper.class})
public interface InscricaoMapper extends EntityMapper<InscricaoDTO, Inscricao> {

    @Mapping(source = "polo.id", target = "poloId")
    @Mapping(source = "evento.id", target = "eventoId")
    @Mapping(source = "comissao.id", target = "comissaoId")
    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "turma.id", target = "turmaId")
    @Mapping(source = "responsavel.id", target = "responsavelId")
    @Mapping(source = "alojamento.id", target = "alojamentoId")
    InscricaoDTO toDto(Inscricao inscricao);

    @Mapping(target = "alojamentoResponsavel", ignore = true)
    @Mapping(source = "poloId", target = "polo")
    @Mapping(source = "eventoId", target = "evento")
    @Mapping(source = "comissaoId", target = "comissao")
    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "turmaId", target = "turma")
    @Mapping(source = "responsavelId", target = "responsavel")
    @Mapping(source = "alojamentoId", target = "alojamento")
    Inscricao toEntity(InscricaoDTO inscricaoDTO);

    default Inscricao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Inscricao inscricao = new Inscricao();
        inscricao.setId(id);
        return inscricao;
    }
}
