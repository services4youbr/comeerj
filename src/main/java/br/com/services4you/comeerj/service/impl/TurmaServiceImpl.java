package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.TurmaService;
import br.com.services4you.comeerj.domain.Turma;
import br.com.services4you.comeerj.repository.TurmaRepository;
import br.com.services4you.comeerj.service.dto.TurmaDTO;
import br.com.services4you.comeerj.service.mapper.TurmaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Turma.
 */
@Service
@Transactional
public class TurmaServiceImpl implements TurmaService {

    private final Logger log = LoggerFactory.getLogger(TurmaServiceImpl.class);

    private final TurmaRepository turmaRepository;

    private final TurmaMapper turmaMapper;

    public TurmaServiceImpl(TurmaRepository turmaRepository, TurmaMapper turmaMapper) {
        this.turmaRepository = turmaRepository;
        this.turmaMapper = turmaMapper;
    }

    /**
     * Save a turma.
     *
     * @param turmaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TurmaDTO save(TurmaDTO turmaDTO) {
        log.debug("Request to save Turma : {}", turmaDTO);
        Turma turma = turmaMapper.toEntity(turmaDTO);
        turma = turmaRepository.save(turma);
        return turmaMapper.toDto(turma);
    }

    /**
     * Get all the turmas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TurmaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Turmas");
        return turmaRepository.findAll(pageable)
            .map(turmaMapper::toDto);
    }

    /**
     * Get one turma by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TurmaDTO findOne(Long id) {
        log.debug("Request to get Turma : {}", id);
        Turma turma = turmaRepository.findOne(id);
        return turmaMapper.toDto(turma);
    }

    /**
     * Delete the turma by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Turma : {}", id);
        turmaRepository.delete(id);
    }
}
