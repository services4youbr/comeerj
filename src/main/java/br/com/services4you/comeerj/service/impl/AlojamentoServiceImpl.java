package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.AlojamentoService;
import br.com.services4you.comeerj.domain.Alojamento;
import br.com.services4you.comeerj.repository.AlojamentoRepository;
import br.com.services4you.comeerj.service.dto.AlojamentoDTO;
import br.com.services4you.comeerj.service.mapper.AlojamentoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Alojamento.
 */
@Service
@Transactional
public class AlojamentoServiceImpl implements AlojamentoService {

    private final Logger log = LoggerFactory.getLogger(AlojamentoServiceImpl.class);

    private final AlojamentoRepository alojamentoRepository;

    private final AlojamentoMapper alojamentoMapper;

    public AlojamentoServiceImpl(AlojamentoRepository alojamentoRepository, AlojamentoMapper alojamentoMapper) {
        this.alojamentoRepository = alojamentoRepository;
        this.alojamentoMapper = alojamentoMapper;
    }

    /**
     * Save a alojamento.
     *
     * @param alojamentoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AlojamentoDTO save(AlojamentoDTO alojamentoDTO) {
        log.debug("Request to save Alojamento : {}", alojamentoDTO);
        Alojamento alojamento = alojamentoMapper.toEntity(alojamentoDTO);
        alojamento = alojamentoRepository.save(alojamento);
        return alojamentoMapper.toDto(alojamento);
    }

    /**
     * Get all the alojamentos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AlojamentoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Alojamentos");
        return alojamentoRepository.findAll(pageable)
            .map(alojamentoMapper::toDto);
    }

    /**
     * Get one alojamento by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AlojamentoDTO findOne(Long id) {
        log.debug("Request to get Alojamento : {}", id);
        Alojamento alojamento = alojamentoRepository.findOne(id);
        return alojamentoMapper.toDto(alojamento);
    }

    /**
     * Delete the alojamento by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Alojamento : {}", id);
        alojamentoRepository.delete(id);
    }
}
