package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.ComissaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Comissao.
 */
public interface ComissaoService {

    /**
     * Save a comissao.
     *
     * @param comissaoDTO the entity to save
     * @return the persisted entity
     */
    ComissaoDTO save(ComissaoDTO comissaoDTO);

    /**
     * Get all the comissaos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ComissaoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" comissao.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ComissaoDTO findOne(Long id);

    /**
     * Delete the "id" comissao.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
