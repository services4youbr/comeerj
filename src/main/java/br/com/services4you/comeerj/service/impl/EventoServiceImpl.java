package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.EventoService;
import br.com.services4you.comeerj.domain.Evento;
import br.com.services4you.comeerj.repository.EventoRepository;
import br.com.services4you.comeerj.service.dto.EventoDTO;
import br.com.services4you.comeerj.service.mapper.EventoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Evento.
 */
@Service
@Transactional
public class EventoServiceImpl implements EventoService {

    private final Logger log = LoggerFactory.getLogger(EventoServiceImpl.class);

    private final EventoRepository eventoRepository;

    private final EventoMapper eventoMapper;

    public EventoServiceImpl(EventoRepository eventoRepository, EventoMapper eventoMapper) {
        this.eventoRepository = eventoRepository;
        this.eventoMapper = eventoMapper;
    }

    /**
     * Save a evento.
     *
     * @param eventoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EventoDTO save(EventoDTO eventoDTO) {
        log.debug("Request to save Evento : {}", eventoDTO);
        Evento evento = eventoMapper.toEntity(eventoDTO);
        evento = eventoRepository.save(evento);
        return eventoMapper.toDto(evento);
    }

    /**
     * Get all the eventos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Eventos");
        return eventoRepository.findAll(pageable)
            .map(eventoMapper::toDto);
    }

    /**
     * Get one evento by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EventoDTO findOne(Long id) {
        log.debug("Request to get Evento : {}", id);
        Evento evento = eventoRepository.findOne(id);
        return eventoMapper.toDto(evento);
    }

    /**
     * Delete the evento by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Evento : {}", id);
        eventoRepository.delete(id);
    }
}
