package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.EventoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Evento and its DTO EventoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EventoMapper extends EntityMapper<EventoDTO, Evento> {


    @Mapping(target = "inscricoes", ignore = true)
    Evento toEntity(EventoDTO eventoDTO);

    default Evento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Evento evento = new Evento();
        evento.setId(id);
        return evento;
    }
}
