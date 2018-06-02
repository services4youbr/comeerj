package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.TurmaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Turma.
 */
public interface TurmaService {

    /**
     * Save a turma.
     *
     * @param turmaDTO the entity to save
     * @return the persisted entity
     */
    TurmaDTO save(TurmaDTO turmaDTO);

    /**
     * Get all the turmas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TurmaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" turma.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TurmaDTO findOne(Long id);

    /**
     * Delete the "id" turma.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the turma corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TurmaDTO> search(String query, Pageable pageable);
}
