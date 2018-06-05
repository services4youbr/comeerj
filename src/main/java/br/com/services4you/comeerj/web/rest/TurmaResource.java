package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.TurmaService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.TurmaDTO;
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
 * REST controller for managing Turma.
 */
@RestController
@RequestMapping("/api")
public class TurmaResource {

    private final Logger log = LoggerFactory.getLogger(TurmaResource.class);

    private static final String ENTITY_NAME = "turma";

    private final TurmaService turmaService;

    public TurmaResource(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    /**
     * POST  /turmas : Create a new turma.
     *
     * @param turmaDTO the turmaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new turmaDTO, or with status 400 (Bad Request) if the turma has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/turmas")
    @Timed
    public ResponseEntity<TurmaDTO> createTurma(@RequestBody TurmaDTO turmaDTO) throws URISyntaxException {
        log.debug("REST request to save Turma : {}", turmaDTO);
        if (turmaDTO.getId() != null) {
            throw new BadRequestAlertException("A new turma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TurmaDTO result = turmaService.save(turmaDTO);
        return ResponseEntity.created(new URI("/api/turmas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /turmas : Updates an existing turma.
     *
     * @param turmaDTO the turmaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated turmaDTO,
     * or with status 400 (Bad Request) if the turmaDTO is not valid,
     * or with status 500 (Internal Server Error) if the turmaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/turmas")
    @Timed
    public ResponseEntity<TurmaDTO> updateTurma(@RequestBody TurmaDTO turmaDTO) throws URISyntaxException {
        log.debug("REST request to update Turma : {}", turmaDTO);
        if (turmaDTO.getId() == null) {
            return createTurma(turmaDTO);
        }
        TurmaDTO result = turmaService.save(turmaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, turmaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /turmas : get all the turmas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of turmas in body
     */
    @GetMapping("/turmas")
    @Timed
    public ResponseEntity<List<TurmaDTO>> getAllTurmas(Pageable pageable) {
        log.debug("REST request to get a page of Turmas");
        Page<TurmaDTO> page = turmaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/turmas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /turmas/:id : get the "id" turma.
     *
     * @param id the id of the turmaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the turmaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/turmas/{id}")
    @Timed
    public ResponseEntity<TurmaDTO> getTurma(@PathVariable Long id) {
        log.debug("REST request to get Turma : {}", id);
        TurmaDTO turmaDTO = turmaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(turmaDTO));
    }

    /**
     * DELETE  /turmas/:id : delete the "id" turma.
     *
     * @param id the id of the turmaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/turmas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTurma(@PathVariable Long id) {
        log.debug("REST request to delete Turma : {}", id);
        turmaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
