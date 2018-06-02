package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.PoloService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.PoloDTO;
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
 * REST controller for managing Polo.
 */
@RestController
@RequestMapping("/api")
public class PoloResource {

    private final Logger log = LoggerFactory.getLogger(PoloResource.class);

    private static final String ENTITY_NAME = "polo";

    private final PoloService poloService;

    public PoloResource(PoloService poloService) {
        this.poloService = poloService;
    }

    /**
     * POST  /polos : Create a new polo.
     *
     * @param poloDTO the poloDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new poloDTO, or with status 400 (Bad Request) if the polo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/polos")
    @Timed
    public ResponseEntity<PoloDTO> createPolo(@RequestBody PoloDTO poloDTO) throws URISyntaxException {
        log.debug("REST request to save Polo : {}", poloDTO);
        if (poloDTO.getId() != null) {
            throw new BadRequestAlertException("A new polo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PoloDTO result = poloService.save(poloDTO);
        return ResponseEntity.created(new URI("/api/polos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /polos : Updates an existing polo.
     *
     * @param poloDTO the poloDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated poloDTO,
     * or with status 400 (Bad Request) if the poloDTO is not valid,
     * or with status 500 (Internal Server Error) if the poloDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/polos")
    @Timed
    public ResponseEntity<PoloDTO> updatePolo(@RequestBody PoloDTO poloDTO) throws URISyntaxException {
        log.debug("REST request to update Polo : {}", poloDTO);
        if (poloDTO.getId() == null) {
            return createPolo(poloDTO);
        }
        PoloDTO result = poloService.save(poloDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, poloDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /polos : get all the polos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of polos in body
     */
    @GetMapping("/polos")
    @Timed
    public ResponseEntity<List<PoloDTO>> getAllPolos(Pageable pageable) {
        log.debug("REST request to get a page of Polos");
        Page<PoloDTO> page = poloService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/polos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /polos/:id : get the "id" polo.
     *
     * @param id the id of the poloDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the poloDTO, or with status 404 (Not Found)
     */
    @GetMapping("/polos/{id}")
    @Timed
    public ResponseEntity<PoloDTO> getPolo(@PathVariable Long id) {
        log.debug("REST request to get Polo : {}", id);
        PoloDTO poloDTO = poloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(poloDTO));
    }

    /**
     * DELETE  /polos/:id : delete the "id" polo.
     *
     * @param id the id of the poloDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/polos/{id}")
    @Timed
    public ResponseEntity<Void> deletePolo(@PathVariable Long id) {
        log.debug("REST request to delete Polo : {}", id);
        poloService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/polos?query=:query : search for the polo corresponding
     * to the query.
     *
     * @param query the query of the polo search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/polos")
    @Timed
    public ResponseEntity<List<PoloDTO>> searchPolos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Polos for query {}", query);
        Page<PoloDTO> page = poloService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/polos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
