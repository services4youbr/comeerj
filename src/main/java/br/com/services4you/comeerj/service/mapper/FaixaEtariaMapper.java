package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.FaixaEtariaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FaixaEtaria and its DTO FaixaEtariaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FaixaEtariaMapper extends EntityMapper<FaixaEtariaDTO, FaixaEtaria> {


    @Mapping(target = "turmas", ignore = true)
    FaixaEtaria toEntity(FaixaEtariaDTO faixaEtariaDTO);

    default FaixaEtaria fromId(Long id) {
        if (id == null) {
            return null;
        }
        FaixaEtaria faixaEtaria = new FaixaEtaria();
        faixaEtaria.setId(id);
        return faixaEtaria;
    }
}
