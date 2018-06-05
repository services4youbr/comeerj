package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.InscricaoService;
import br.com.services4you.comeerj.domain.Inscricao;
import br.com.services4you.comeerj.repository.InscricaoRepository;
import br.com.services4you.comeerj.service.dto.InscricaoDTO;
import br.com.services4you.comeerj.service.mapper.InscricaoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Inscricao.
 */
@Service
@Transactional
public class InscricaoServiceImpl implements InscricaoService {

    private final Logger log = LoggerFactory.getLogger(InscricaoServiceImpl.class);

    private final InscricaoRepository inscricaoRepository;

    private final InscricaoMapper inscricaoMapper;

    public InscricaoServiceImpl(InscricaoRepository inscricaoRepository, InscricaoMapper inscricaoMapper) {
        this.inscricaoRepository = inscricaoRepository;
        this.inscricaoMapper = inscricaoMapper;
    }

    /**
     * Save a inscricao.
     *
     * @param inscricaoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InscricaoDTO save(InscricaoDTO inscricaoDTO) {
        log.debug("Request to save Inscricao : {}", inscricaoDTO);
        Inscricao inscricao = inscricaoMapper.toEntity(inscricaoDTO);
        inscricao = inscricaoRepository.save(inscricao);
        return inscricaoMapper.toDto(inscricao);
    }

    /**
     * Get all the inscricaos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<InscricaoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Inscricaos");
        return inscricaoRepository.findAll(pageable)
            .map(inscricaoMapper::toDto);
    }


    /**
     *  get all the inscricaos where AlojamentoResponsavel is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<InscricaoDTO> findAllWhereAlojamentoResponsavelIsNull() {
        log.debug("Request to get all inscricaos where AlojamentoResponsavel is null");
        return StreamSupport
            .stream(inscricaoRepository.findAll().spliterator(), false)
            .filter(inscricao -> inscricao.getAlojamentoResponsavel() == null)
            .map(inscricaoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one inscricao by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InscricaoDTO findOne(Long id) {
        log.debug("Request to get Inscricao : {}", id);
        Inscricao inscricao = inscricaoRepository.findOne(id);
        return inscricaoMapper.toDto(inscricao);
    }

    /**
     * Delete the inscricao by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inscricao : {}", id);
        inscricaoRepository.delete(id);
    }
}
