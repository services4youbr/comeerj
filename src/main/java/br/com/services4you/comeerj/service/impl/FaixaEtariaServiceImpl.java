package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.FaixaEtariaService;
import br.com.services4you.comeerj.domain.FaixaEtaria;
import br.com.services4you.comeerj.repository.FaixaEtariaRepository;
import br.com.services4you.comeerj.service.dto.FaixaEtariaDTO;
import br.com.services4you.comeerj.service.mapper.FaixaEtariaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing FaixaEtaria.
 */
@Service
@Transactional
public class FaixaEtariaServiceImpl implements FaixaEtariaService {

    private final Logger log = LoggerFactory.getLogger(FaixaEtariaServiceImpl.class);

    private final FaixaEtariaRepository faixaEtariaRepository;

    private final FaixaEtariaMapper faixaEtariaMapper;

    public FaixaEtariaServiceImpl(FaixaEtariaRepository faixaEtariaRepository, FaixaEtariaMapper faixaEtariaMapper) {
        this.faixaEtariaRepository = faixaEtariaRepository;
        this.faixaEtariaMapper = faixaEtariaMapper;
    }

    /**
     * Save a faixaEtaria.
     *
     * @param faixaEtariaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FaixaEtariaDTO save(FaixaEtariaDTO faixaEtariaDTO) {
        log.debug("Request to save FaixaEtaria : {}", faixaEtariaDTO);
        FaixaEtaria faixaEtaria = faixaEtariaMapper.toEntity(faixaEtariaDTO);
        faixaEtaria = faixaEtariaRepository.save(faixaEtaria);
        return faixaEtariaMapper.toDto(faixaEtaria);
    }

    /**
     * Get all the faixaEtarias.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FaixaEtariaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FaixaEtarias");
        return faixaEtariaRepository.findAll(pageable)
            .map(faixaEtariaMapper::toDto);
    }

    /**
     * Get one faixaEtaria by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FaixaEtariaDTO findOne(Long id) {
        log.debug("Request to get FaixaEtaria : {}", id);
        FaixaEtaria faixaEtaria = faixaEtariaRepository.findOne(id);
        return faixaEtariaMapper.toDto(faixaEtaria);
    }

    /**
     * Delete the faixaEtaria by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FaixaEtaria : {}", id);
        faixaEtariaRepository.delete(id);
    }
}
