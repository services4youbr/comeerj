package br.com.services4you.comeerj.service.mapper;

import br.com.services4you.comeerj.domain.*;
import br.com.services4you.comeerj.service.dto.ComissaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comissao and its DTO ComissaoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ComissaoMapper extends EntityMapper<ComissaoDTO, Comissao> {


    @Mapping(target = "inscricoes", ignore = true)
    Comissao toEntity(ComissaoDTO comissaoDTO);

    default Comissao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comissao comissao = new Comissao();
        comissao.setId(id);
        return comissao;
    }
}
