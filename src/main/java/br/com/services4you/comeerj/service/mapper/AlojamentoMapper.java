package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.AlojamentoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Alojamento and its DTO AlojamentoDTO.
 */
@Mapper(componentModel = "spring", uses = {InscricaoMapper.class})
public interface AlojamentoMapper extends EntityMapper<AlojamentoDTO, Alojamento> {

    @Mapping(source = "responsavel.id", target = "responsavelId")
    AlojamentoDTO toDto(Alojamento alojamento);

    @Mapping(source = "responsavelId", target = "responsavel")
    @Mapping(target = "inscritos", ignore = true)
    Alojamento toEntity(AlojamentoDTO alojamentoDTO);

    default Alojamento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Alojamento alojamento = new Alojamento();
        alojamento.setId(id);
        return alojamento;
    }
}
