package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.TurmaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Turma and its DTO TurmaDTO.
 */
@Mapper(componentModel = "spring", uses = {FaixaEtariaMapper.class})
public interface TurmaMapper extends EntityMapper<TurmaDTO, Turma> {

    @Mapping(source = "faixaEtaria.id", target = "faixaEtariaId")
    TurmaDTO toDto(Turma turma);

    @Mapping(target = "inscritos", ignore = true)
    @Mapping(target = "evangelizadores", ignore = true)
    @Mapping(source = "faixaEtariaId", target = "faixaEtaria")
    Turma toEntity(TurmaDTO turmaDTO);

    default Turma fromId(Long id) {
        if (id == null) {
            return null;
        }
        Turma turma = new Turma();
        turma.setId(id);
        return turma;
    }
}
