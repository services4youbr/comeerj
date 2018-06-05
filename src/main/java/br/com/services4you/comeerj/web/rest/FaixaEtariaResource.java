package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.FaixaEtariaService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.FaixaEtariaDTO;
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

/**
 * REST controller for managing FaixaEtaria.
 */
@RestController
@RequestMapping("/api")
public class FaixaEtariaResource {

    private final Logger log = LoggerFactory.getLogger(FaixaEtariaResource.class);

    private static final String ENTITY_NAME = "faixaEtaria";

    private final FaixaEtariaService faixaEtariaService;

    public FaixaEtariaResource(FaixaEtariaService faixaEtariaService) {
        this.faixaEtariaService = faixaEtariaService;
    }

    /**
     * POST  /faixa-etarias : Create a new faixaEtaria.
     *
     * @param faixaEtariaDTO the faixaEtariaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new faixaEtariaDTO, or with status 400 (Bad Request) if the faixaEtaria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/faixa-etarias")
    @Timed
    public ResponseEntity<FaixaEtariaDTO> createFaixaEtaria(@RequestBody FaixaEtariaDTO faixaEtariaDTO) throws URISyntaxException {
        log.debug("REST request to save FaixaEtaria : {}", faixaEtariaDTO);
        if (faixaEtariaDTO.getId() != null) {
            throw new BadRequestAlertException("A new faixaEtaria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FaixaEtariaDTO result = faixaEtariaService.save(faixaEtariaDTO);
        return ResponseEntity.created(new URI("/api/faixa-etarias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /faixa-etarias : Updates an existing faixaEtaria.
     *
     * @param faixaEtariaDTO the faixaEtariaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated faixaEtariaDTO,
     * or with status 400 (Bad Request) if the faixaEtariaDTO is not valid,
     * or with status 500 (Internal Server Error) if the faixaEtariaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/faixa-etarias")
    @Timed
    public ResponseEntity<FaixaEtariaDTO> updateFaixaEtaria(@RequestBody FaixaEtariaDTO faixaEtariaDTO) throws URISyntaxException {
        log.debug("REST request to update FaixaEtaria : {}", faixaEtariaDTO);
        if (faixaEtariaDTO.getId() == null) {
            return createFaixaEtaria(faixaEtariaDTO);
        }
        FaixaEtariaDTO result = faixaEtariaService.save(faixaEtariaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, faixaEtariaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /faixa-etarias : get all the faixaEtarias.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of faixaEtarias in body
     */
    @GetMapping("/faixa-etarias")
    @Timed
    public ResponseEntity<List<FaixaEtariaDTO>> getAllFaixaEtarias(Pageable pageable) {
        log.debug("REST request to get a page of FaixaEtarias");
        Page<FaixaEtariaDTO> page = faixaEtariaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/faixa-etarias");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /faixa-etarias/:id : get the "id" faixaEtaria.
     *
     * @param id the id of the faixaEtariaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the faixaEtariaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/faixa-etarias/{id}")
    @Timed
    public ResponseEntity<FaixaEtariaDTO> getFaixaEtaria(@PathVariable Long id) {
        log.debug("REST request to get FaixaEtaria : {}", id);
        FaixaEtariaDTO faixaEtariaDTO = faixaEtariaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(faixaEtariaDTO));
    }

    /**
     * DELETE  /faixa-etarias/:id : delete the "id" faixaEtaria.
     *
     * @param id the id of the faixaEtariaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/faixa-etarias/{id}")
    @Timed
    public ResponseEntity<Void> deleteFaixaEtaria(@PathVariable Long id) {
        log.debug("REST request to delete FaixaEtaria : {}", id);
        faixaEtariaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
