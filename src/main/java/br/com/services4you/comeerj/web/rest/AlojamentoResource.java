package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.AlojamentoService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.AlojamentoDTO;
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
 * REST controller for managing Alojamento.
 */
@RestController
@RequestMapping("/api")
public class AlojamentoResource {

    private final Logger log = LoggerFactory.getLogger(AlojamentoResource.class);

    private static final String ENTITY_NAME = "alojamento";

    private final AlojamentoService alojamentoService;

    public AlojamentoResource(AlojamentoService alojamentoService) {
        this.alojamentoService = alojamentoService;
    }

    /**
     * POST  /alojamentos : Create a new alojamento.
     *
     * @param alojamentoDTO the alojamentoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alojamentoDTO, or with status 400 (Bad Request) if the alojamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alojamentos")
    @Timed
    public ResponseEntity<AlojamentoDTO> createAlojamento(@RequestBody AlojamentoDTO alojamentoDTO) throws URISyntaxException {
        log.debug("REST request to save Alojamento : {}", alojamentoDTO);
        if (alojamentoDTO.getId() != null) {
            throw new BadRequestAlertException("A new alojamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlojamentoDTO result = alojamentoService.save(alojamentoDTO);
        return ResponseEntity.created(new URI("/api/alojamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alojamentos : Updates an existing alojamento.
     *
     * @param alojamentoDTO the alojamentoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alojamentoDTO,
     * or with status 400 (Bad Request) if the alojamentoDTO is not valid,
     * or with status 500 (Internal Server Error) if the alojamentoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alojamentos")
    @Timed
    public ResponseEntity<AlojamentoDTO> updateAlojamento(@RequestBody AlojamentoDTO alojamentoDTO) throws URISyntaxException {
        log.debug("REST request to update Alojamento : {}", alojamentoDTO);
        if (alojamentoDTO.getId() == null) {
            return createAlojamento(alojamentoDTO);
        }
        AlojamentoDTO result = alojamentoService.save(alojamentoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alojamentoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alojamentos : get all the alojamentos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of alojamentos in body
     */
    @GetMapping("/alojamentos")
    @Timed
    public ResponseEntity<List<AlojamentoDTO>> getAllAlojamentos(Pageable pageable) {
        log.debug("REST request to get a page of Alojamentos");
        Page<AlojamentoDTO> page = alojamentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/alojamentos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /alojamentos/:id : get the "id" alojamento.
     *
     * @param id the id of the alojamentoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alojamentoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/alojamentos/{id}")
    @Timed
    public ResponseEntity<AlojamentoDTO> getAlojamento(@PathVariable Long id) {
        log.debug("REST request to get Alojamento : {}", id);
        AlojamentoDTO alojamentoDTO = alojamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(alojamentoDTO));
    }

    /**
     * DELETE  /alojamentos/:id : delete the "id" alojamento.
     *
     * @param id the id of the alojamentoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alojamentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlojamento(@PathVariable Long id) {
        log.debug("REST request to delete Alojamento : {}", id);
        alojamentoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/alojamentos?query=:query : search for the alojamento corresponding
     * to the query.
     *
     * @param query the query of the alojamento search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/alojamentos")
    @Timed
    public ResponseEntity<List<AlojamentoDTO>> searchAlojamentos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Alojamentos for query {}", query);
        Page<AlojamentoDTO> page = alojamentoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/alojamentos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
