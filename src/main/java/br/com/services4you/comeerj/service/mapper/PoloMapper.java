package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.PoloDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Polo and its DTO PoloDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PoloMapper extends EntityMapper<PoloDTO, Polo> {


    @Mapping(target = "inscricoes", ignore = true)
    Polo toEntity(PoloDTO poloDTO);

    default Polo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Polo polo = new Polo();
        polo.setId(id);
        return polo;
    }
}
