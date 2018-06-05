package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.PoloService;
import br.com.services4you.comeerj.domain.Polo;
import br.com.services4you.comeerj.repository.PoloRepository;
import br.com.services4you.comeerj.service.dto.PoloDTO;
import br.com.services4you.comeerj.service.mapper.PoloMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Polo.
 */
@Service
@Transactional
public class PoloServiceImpl implements PoloService {

    private final Logger log = LoggerFactory.getLogger(PoloServiceImpl.class);

    private final PoloRepository poloRepository;

    private final PoloMapper poloMapper;

    public PoloServiceImpl(PoloRepository poloRepository, PoloMapper poloMapper) {
        this.poloRepository = poloRepository;
        this.poloMapper = poloMapper;
    }

    /**
     * Save a polo.
     *
     * @param poloDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PoloDTO save(PoloDTO poloDTO) {
        log.debug("Request to save Polo : {}", poloDTO);
        Polo polo = poloMapper.toEntity(poloDTO);
        polo = poloRepository.save(polo);
        return poloMapper.toDto(polo);
    }

    /**
     * Get all the polos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PoloDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Polos");
        return poloRepository.findAll(pageable)
            .map(poloMapper::toDto);
    }

    /**
     * Get one polo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PoloDTO findOne(Long id) {
        log.debug("Request to get Polo : {}", id);
        Polo polo = poloRepository.findOne(id);
        return poloMapper.toDto(polo);
    }

    /**
     * Delete the polo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Polo : {}", id);
        poloRepository.delete(id);
    }
}
