package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.AlojamentoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Alojamento.
 */
public interface AlojamentoService {

    /**
     * Save a alojamento.
     *
     * @param alojamentoDTO the entity to save
     * @return the persisted entity
     */
    AlojamentoDTO save(AlojamentoDTO alojamentoDTO);

    /**
     * Get all the alojamentos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AlojamentoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" alojamento.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AlojamentoDTO findOne(Long id);

    /**
     * Delete the "id" alojamento.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the alojamento corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AlojamentoDTO> search(String query, Pageable pageable);
}
