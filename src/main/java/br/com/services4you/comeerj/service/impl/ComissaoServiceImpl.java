package br.com.services4you.comeerj.service.impl;

import br.com.services4you.comeerj.service.ComissaoService;
import br.com.services4you.comeerj.domain.Comissao;
import br.com.services4you.comeerj.repository.ComissaoRepository;
import br.com.services4you.comeerj.service.dto.ComissaoDTO;
import br.com.services4you.comeerj.service.mapper.ComissaoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Comissao.
 */
@Service
@Transactional
public class ComissaoServiceImpl implements ComissaoService {

    private final Logger log = LoggerFactory.getLogger(ComissaoServiceImpl.class);

    private final ComissaoRepository comissaoRepository;

    private final ComissaoMapper comissaoMapper;

    public ComissaoServiceImpl(ComissaoRepository comissaoRepository, ComissaoMapper comissaoMapper) {
        this.comissaoRepository = comissaoRepository;
        this.comissaoMapper = comissaoMapper;
    }

    /**
     * Save a comissao.
     *
     * @param comissaoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ComissaoDTO save(ComissaoDTO comissaoDTO) {
        log.debug("Request to save Comissao : {}", comissaoDTO);
        Comissao comissao = comissaoMapper.toEntity(comissaoDTO);
        comissao = comissaoRepository.save(comissao);
        return comissaoMapper.toDto(comissao);
    }

    /**
     * Get all the comissaos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ComissaoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Comissaos");
        return comissaoRepository.findAll(pageable)
            .map(comissaoMapper::toDto);
    }

    /**
     * Get one comissao by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ComissaoDTO findOne(Long id) {
        log.debug("Request to get Comissao : {}", id);
        Comissao comissao = comissaoRepository.findOne(id);
        return comissaoMapper.toDto(comissao);
    }

    /**
     * Delete the comissao by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Comissao : {}", id);
        comissaoRepository.delete(id);
    }
}
