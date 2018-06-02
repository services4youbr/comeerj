package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.InscricaoService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.InscricaoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Inscricao.
 */
@RestController
@RequestMapping("/api")
public class InscricaoResource {

    private final Logger log = LoggerFactory.getLogger(InscricaoResource.class);

    private static final String ENTITY_NAME = "inscricao";

    private final InscricaoService inscricaoService;

    public InscricaoResource(InscricaoService inscricaoService) {
        this.inscricaoService = inscricaoService;
    }

    /**
     * POST  /inscricaos : Create a new inscricao.
     *
     * @param inscricaoDTO the inscricaoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inscricaoDTO, or with status 400 (Bad Request) if the inscricao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inscricaos")
    @Timed
    public ResponseEntity<InscricaoDTO> createInscricao(@RequestBody InscricaoDTO inscricaoDTO) throws URISyntaxException {
        log.debug("REST request to save Inscricao : {}", inscricaoDTO);
        if (inscricaoDTO.getId() != null) {
            throw new BadRequestAlertException("A new inscricao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscricaoDTO result = inscricaoService.save(inscricaoDTO);
        return ResponseEntity.created(new URI("/api/inscricaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inscricaos : Updates an existing inscricao.
     *
     * @param inscricaoDTO the inscricaoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inscricaoDTO,
     * or with status 400 (Bad Request) if the inscricaoDTO is not valid,
     * or with status 500 (Internal Server Error) if the inscricaoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inscricaos")
    @Timed
    public ResponseEntity<InscricaoDTO> updateInscricao(@RequestBody InscricaoDTO inscricaoDTO) throws URISyntaxException {
        log.debug("REST request to update Inscricao : {}", inscricaoDTO);
        if (inscricaoDTO.getId() == null) {
            return createInscricao(inscricaoDTO);
        }
        InscricaoDTO result = inscricaoService.save(inscricaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inscricaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inscricaos : get all the inscricaos.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of inscricaos in body
     */
    @GetMapping("/inscricaos")
    @Timed
    public ResponseEntity<List<InscricaoDTO>> getAllInscricaos(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("alojamentoresponsavel-is-null".equals(filter)) {
            log.debug("REST request to get all Inscricaos where alojamentoResponsavel is null");
            return new ResponseEntity<>(inscricaoService.findAllWhereAlojamentoResponsavelIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Inscricaos");
        Page<InscricaoDTO> page = inscricaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/inscricaos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /inscricaos/:id : get the "id" inscricao.
     *
     * @param id the id of the inscricaoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inscricaoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/inscricaos/{id}")
    @Timed
    public ResponseEntity<InscricaoDTO> getInscricao(@PathVariable Long id) {
        log.debug("REST request to get Inscricao : {}", id);
        InscricaoDTO inscricaoDTO = inscricaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inscricaoDTO));
    }

    /**
     * DELETE  /inscricaos/:id : delete the "id" inscricao.
     *
     * @param id the id of the inscricaoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inscricaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteInscricao(@PathVariable Long id) {
        log.debug("REST request to delete Inscricao : {}", id);
        inscricaoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/inscricaos?query=:query : search for the inscricao corresponding
     * to the query.
     *
     * @param query the query of the inscricao search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/inscricaos")
    @Timed
    public ResponseEntity<List<InscricaoDTO>> searchInscricaos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Inscricaos for query {}", query);
        Page<InscricaoDTO> page = inscricaoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/inscricaos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
