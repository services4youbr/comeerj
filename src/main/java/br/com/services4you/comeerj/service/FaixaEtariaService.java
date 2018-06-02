package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.FaixaEtariaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing FaixaEtaria.
 */
public interface FaixaEtariaService {

    /**
     * Save a faixaEtaria.
     *
     * @param faixaEtariaDTO the entity to save
     * @return the persisted entity
     */
    FaixaEtariaDTO save(FaixaEtariaDTO faixaEtariaDTO);

    /**
     * Get all the faixaEtarias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FaixaEtariaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" faixaEtaria.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FaixaEtariaDTO findOne(Long id);

    /**
     * Delete the "id" faixaEtaria.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the faixaEtaria corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FaixaEtariaDTO> search(String query, Pageable pageable);
}
