package br.com.services4you.comeerj.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.services4you.comeerj.service.EventoService;
import br.com.services4you.comeerj.web.rest.errors.BadRequestAlertException;
import br.com.services4you.comeerj.web.rest.util.HeaderUtil;
import br.com.services4you.comeerj.web.rest.util.PaginationUtil;
import br.com.services4you.comeerj.service.dto.EventoDTO;
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
 * REST controller for managing Evento.
 */
@RestController
@RequestMapping("/api")
public class EventoResource {

    private final Logger log = LoggerFactory.getLogger(EventoResource.class);

    private static final String ENTITY_NAME = "evento";

    private final EventoService eventoService;

    public EventoResource(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    /**
     * POST  /eventos : Create a new evento.
     *
     * @param eventoDTO the eventoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventoDTO, or with status 400 (Bad Request) if the evento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eventos")
    @Timed
    public ResponseEntity<EventoDTO> createEvento(@RequestBody EventoDTO eventoDTO) throws URISyntaxException {
        log.debug("REST request to save Evento : {}", eventoDTO);
        if (eventoDTO.getId() != null) {
            throw new BadRequestAlertException("A new evento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventoDTO result = eventoService.save(eventoDTO);
        return ResponseEntity.created(new URI("/api/eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eventos : Updates an existing evento.
     *
     * @param eventoDTO the eventoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventoDTO,
     * or with status 400 (Bad Request) if the eventoDTO is not valid,
     * or with status 500 (Internal Server Error) if the eventoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eventos")
    @Timed
    public ResponseEntity<EventoDTO> updateEvento(@RequestBody EventoDTO eventoDTO) throws URISyntaxException {
        log.debug("REST request to update Evento : {}", eventoDTO);
        if (eventoDTO.getId() == null) {
            return createEvento(eventoDTO);
        }
        EventoDTO result = eventoService.save(eventoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eventos : get all the eventos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eventos in body
     */
    @GetMapping("/eventos")
    @Timed
    public ResponseEntity<List<EventoDTO>> getAllEventos(Pageable pageable) {
        log.debug("REST request to get a page of Eventos");
        Page<EventoDTO> page = eventoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/eventos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /eventos/:id : get the "id" evento.
     *
     * @param id the id of the eventoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/eventos/{id}")
    @Timed
    public ResponseEntity<EventoDTO> getEvento(@PathVariable Long id) {
        log.debug("REST request to get Evento : {}", id);
        EventoDTO eventoDTO = eventoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eventoDTO));
    }

    /**
     * DELETE  /eventos/:id : delete the "id" evento.
     *
     * @param id the id of the eventoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eventos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvento(@PathVariable Long id) {
        log.debug("REST request to delete Evento : {}", id);
        eventoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/eventos?query=:query : search for the evento corresponding
     * to the query.
     *
     * @param query the query of the evento search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/eventos")
    @Timed
    public ResponseEntity<List<EventoDTO>> searchEventos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Eventos for query {}", query);
        Page<EventoDTO> page = eventoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/eventos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
