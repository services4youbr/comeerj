package br.com.services4you.comeerj.service;

import br.com.services4you.comeerj.service.dto.InscricaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Inscricao.
 */
public interface InscricaoService {

    /**
     * Save a inscricao.
     *
     * @param inscricaoDTO the entity to save
     * @return the persisted entity
     */
    InscricaoDTO save(InscricaoDTO inscricaoDTO);

    /**
     * Get all the inscricaos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InscricaoDTO> findAll(Pageable pageable);
    /**
     * Get all the InscricaoDTO where AlojamentoResponsavel is null.
     *
     * @return the list of entities
     */
    List<InscricaoDTO> findAllWhereAlojamentoResponsavelIsNull();

    /**
     * Get the "id" inscricao.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InscricaoDTO findOne(Long id);

    /**
     * Delete the "id" inscricao.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the inscricao corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InscricaoDTO> search(String query, Pageable pageable);
}
