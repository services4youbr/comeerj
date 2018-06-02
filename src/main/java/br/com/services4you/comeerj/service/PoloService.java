package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.PoloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Polo.
 */
public interface PoloService {

    /**
     * Save a polo.
     *
     * @param poloDTO the entity to save
     * @return the persisted entity
     */
    PoloDTO save(PoloDTO poloDTO);

    /**
     * Get all the polos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PoloDTO> findAll(Pageable pageable);

    /**
     * Get the "id" polo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PoloDTO findOne(Long id);

    /**
     * Delete the "id" polo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the polo corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PoloDTO> search(String query, Pageable pageable);
}
