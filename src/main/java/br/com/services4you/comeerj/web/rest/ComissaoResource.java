package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.ComissaoService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.ComissaoDTO;
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
 * REST controller for managing Comissao.
 */
@RestController
@RequestMapping("/api")
public class ComissaoResource {

    private final Logger log = LoggerFactory.getLogger(ComissaoResource.class);

    private static final String ENTITY_NAME = "comissao";

    private final ComissaoService comissaoService;

    public ComissaoResource(ComissaoService comissaoService) {
        this.comissaoService = comissaoService;
    }

    /**
     * POST  /comissaos : Create a new comissao.
     *
     * @param comissaoDTO the comissaoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comissaoDTO, or with status 400 (Bad Request) if the comissao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comissaos")
    @Timed
    public ResponseEntity<ComissaoDTO> createComissao(@RequestBody ComissaoDTO comissaoDTO) throws URISyntaxException {
        log.debug("REST request to save Comissao : {}", comissaoDTO);
        if (comissaoDTO.getId() != null) {
            throw new BadRequestAlertException("A new comissao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ComissaoDTO result = comissaoService.save(comissaoDTO);
        return ResponseEntity.created(new URI("/api/comissaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comissaos : Updates an existing comissao.
     *
     * @param comissaoDTO the comissaoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comissaoDTO,
     * or with status 400 (Bad Request) if the comissaoDTO is not valid,
     * or with status 500 (Internal Server Error) if the comissaoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comissaos")
    @Timed
    public ResponseEntity<ComissaoDTO> updateComissao(@RequestBody ComissaoDTO comissaoDTO) throws URISyntaxException {
        log.debug("REST request to update Comissao : {}", comissaoDTO);
        if (comissaoDTO.getId() == null) {
            return createComissao(comissaoDTO);
        }
        ComissaoDTO result = comissaoService.save(comissaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comissaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comissaos : get all the comissaos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of comissaos in body
     */
    @GetMapping("/comissaos")
    @Timed
    public ResponseEntity<List<ComissaoDTO>> getAllComissaos(Pageable pageable) {
        log.debug("REST request to get a page of Comissaos");
        Page<ComissaoDTO> page = comissaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comissaos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /comissaos/:id : get the "id" comissao.
     *
     * @param id the id of the comissaoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comissaoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/comissaos/{id}")
    @Timed
    public ResponseEntity<ComissaoDTO> getComissao(@PathVariable Long id) {
        log.debug("REST request to get Comissao : {}", id);
        ComissaoDTO comissaoDTO = comissaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comissaoDTO));
    }

    /**
     * DELETE  /comissaos/:id : delete the "id" comissao.
     *
     * @param id the id of the comissaoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comissaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteComissao(@PathVariable Long id) {
        log.debug("REST request to delete Comissao : {}", id);
        comissaoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/comissaos?query=:query : search for the comissao corresponding
     * to the query.
     *
     * @param query the query of the comissao search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/comissaos")
    @Timed
    public ResponseEntity<List<ComissaoDTO>> searchComissaos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Comissaos for query {}", query);
        Page<ComissaoDTO> page = comissaoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/comissaos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
