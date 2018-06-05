package br.com.services4you.comeerj.web.rest;

import br.com.services4you.comeerj.ComeerjApp;

import br.com.services4you.comeerj.domain.Comissao;
import br.com.services4you.comeerj.repository.ComissaoRepository;
import br.com.services4you.comeerj.service.ComissaoService;
import br.com.services4you.comeerj.service.dto.ComissaoDTO;
import br.com.services4you.comeerj.service.mapper.ComissaoMapper;
import br.com.services4you.comeerj.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.services4you.comeerj.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ComissaoResource REST controller.
 *
 * @see ComissaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeerjApp.class)
public class ComissaoResourceIntTest {

    private static final String DEFAULT_COMISSAO = "AAAAAAAAAA";
    private static final String UPDATED_COMISSAO = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private ComissaoRepository comissaoRepository;

    @Autowired
    private ComissaoMapper comissaoMapper;

    @Autowired
    private ComissaoService comissaoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComissaoMockMvc;

    private Comissao comissao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComissaoResource comissaoResource = new ComissaoResource(comissaoService);
        this.restComissaoMockMvc = MockMvcBuilders.standaloneSetup(comissaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comissao createEntity(EntityManager em) {
        Comissao comissao = new Comissao()
            .comissao(DEFAULT_COMISSAO)
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO);
        return comissao;
    }

    @Before
    public void initTest() {
        comissao = createEntity(em);
    }

    @Test
    @Transactional
    public void createComissao() throws Exception {
        int databaseSizeBeforeCreate = comissaoRepository.findAll().size();

        // Create the Comissao
        ComissaoDTO comissaoDTO = comissaoMapper.toDto(comissao);
        restComissaoMockMvc.perform(post("/api/comissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comissaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Comissao in the database
        List<Comissao> comissaoList = comissaoRepository.findAll();
        assertThat(comissaoList).hasSize(databaseSizeBeforeCreate + 1);
        Comissao testComissao = comissaoList.get(comissaoList.size() - 1);
        assertThat(testComissao.getComissao()).isEqualTo(DEFAULT_COMISSAO);
        assertThat(testComissao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testComissao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createComissaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comissaoRepository.findAll().size();

        // Create the Comissao with an existing ID
        comissao.setId(1L);
        ComissaoDTO comissaoDTO = comissaoMapper.toDto(comissao);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComissaoMockMvc.perform(post("/api/comissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comissaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comissao in the database
        List<Comissao> comissaoList = comissaoRepository.findAll();
        assertThat(comissaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComissaos() throws Exception {
        // Initialize the database
        comissaoRepository.saveAndFlush(comissao);

        // Get all the comissaoList
        restComissaoMockMvc.perform(get("/api/comissaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comissao.getId().intValue())))
            .andExpect(jsonPath("$.[*].comissao").value(hasItem(DEFAULT_COMISSAO.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }

    @Test
    @Transactional
    public void getComissao() throws Exception {
        // Initialize the database
        comissaoRepository.saveAndFlush(comissao);

        // Get the comissao
        restComissaoMockMvc.perform(get("/api/comissaos/{id}", comissao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comissao.getId().intValue()))
            .andExpect(jsonPath("$.comissao").value(DEFAULT_COMISSAO.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComissao() throws Exception {
        // Get the comissao
        restComissaoMockMvc.perform(get("/api/comissaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComissao() throws Exception {
        // Initialize the database
        comissaoRepository.saveAndFlush(comissao);
        int databaseSizeBeforeUpdate = comissaoRepository.findAll().size();

        // Update the comissao
        Comissao updatedComissao = comissaoRepository.findOne(comissao.getId());
        // Disconnect from session so that the updates on updatedComissao are not directly saved in db
        em.detach(updatedComissao);
        updatedComissao
            .comissao(UPDATED_COMISSAO)
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO);
        ComissaoDTO comissaoDTO = comissaoMapper.toDto(updatedComissao);

        restComissaoMockMvc.perform(put("/api/comissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comissaoDTO)))
            .andExpect(status().isOk());

        // Validate the Comissao in the database
        List<Comissao> comissaoList = comissaoRepository.findAll();
        assertThat(comissaoList).hasSize(databaseSizeBeforeUpdate);
        Comissao testComissao = comissaoList.get(comissaoList.size() - 1);
        assertThat(testComissao.getComissao()).isEqualTo(UPDATED_COMISSAO);
        assertThat(testComissao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testComissao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingComissao() throws Exception {
        int databaseSizeBeforeUpdate = comissaoRepository.findAll().size();

        // Create the Comissao
        ComissaoDTO comissaoDTO = comissaoMapper.toDto(comissao);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restComissaoMockMvc.perform(put("/api/comissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comissaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Comissao in the database
        List<Comissao> comissaoList = comissaoRepository.findAll();
        assertThat(comissaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteComissao() throws Exception {
        // Initialize the database
        comissaoRepository.saveAndFlush(comissao);
        int databaseSizeBeforeDelete = comissaoRepository.findAll().size();

        // Get the comissao
        restComissaoMockMvc.perform(delete("/api/comissaos/{id}", comissao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Comissao> comissaoList = comissaoRepository.findAll();
        assertThat(comissaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comissao.class);
        Comissao comissao1 = new Comissao();
        comissao1.setId(1L);
        Comissao comissao2 = new Comissao();
        comissao2.setId(comissao1.getId());
        assertThat(comissao1).isEqualTo(comissao2);
        comissao2.setId(2L);
        assertThat(comissao1).isNotEqualTo(comissao2);
        comissao1.setId(null);
        assertThat(comissao1).isNotEqualTo(comissao2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComissaoDTO.class);
        ComissaoDTO comissaoDTO1 = new ComissaoDTO();
        comissaoDTO1.setId(1L);
        ComissaoDTO comissaoDTO2 = new ComissaoDTO();
        assertThat(comissaoDTO1).isNotEqualTo(comissaoDTO2);
        comissaoDTO2.setId(comissaoDTO1.getId());
        assertThat(comissaoDTO1).isEqualTo(comissaoDTO2);
        comissaoDTO2.setId(2L);
        assertThat(comissaoDTO1).isNotEqualTo(comissaoDTO2);
        comissaoDTO1.setId(null);
        assertThat(comissaoDTO1).isNotEqualTo(comissaoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(comissaoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(comissaoMapper.fromId(null)).isNull();
    }
}
