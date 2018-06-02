package br.com.services4you.comeerj.web.rest;

import br.com.services4you.comeerj.ComeerjApp;

import br.com.services4you.comeerj.domain.Polo;
import br.com.services4you.comeerj.repository.PoloRepository;
import br.com.services4you.comeerj.service.PoloService;
import br.com.services4you.comeerj.repository.search.PoloSearchRepository;
import br.com.services4you.comeerj.service.dto.PoloDTO;
import br.com.services4you.comeerj.service.mapper.PoloMapper;
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
 * Test class for the PoloResource REST controller.
 *
 * @see PoloResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeerjApp.class)
public class PoloResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final String DEFAULT_REUNIR = "AAAAAAAAAA";
    private static final String UPDATED_REUNIR = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALIZACAO = "AAAAAAAAAA";
    private static final String UPDATED_LOCALIZACAO = "BBBBBBBBBB";

    @Autowired
    private PoloRepository poloRepository;

    @Autowired
    private PoloMapper poloMapper;

    @Autowired
    private PoloService poloService;

    @Autowired
    private PoloSearchRepository poloSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPoloMockMvc;

    private Polo polo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PoloResource poloResource = new PoloResource(poloService);
        this.restPoloMockMvc = MockMvcBuilders.standaloneSetup(poloResource)
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
    public static Polo createEntity(EntityManager em) {
        Polo polo = new Polo()
            .nome(DEFAULT_NOME)
            .numero(DEFAULT_NUMERO)
            .reunir(DEFAULT_REUNIR)
            .localizacao(DEFAULT_LOCALIZACAO);
        return polo;
    }

    @Before
    public void initTest() {
        poloSearchRepository.deleteAll();
        polo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPolo() throws Exception {
        int databaseSizeBeforeCreate = poloRepository.findAll().size();

        // Create the Polo
        PoloDTO poloDTO = poloMapper.toDto(polo);
        restPoloMockMvc.perform(post("/api/polos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(poloDTO)))
            .andExpect(status().isCreated());

        // Validate the Polo in the database
        List<Polo> poloList = poloRepository.findAll();
        assertThat(poloList).hasSize(databaseSizeBeforeCreate + 1);
        Polo testPolo = poloList.get(poloList.size() - 1);
        assertThat(testPolo.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPolo.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testPolo.getReunir()).isEqualTo(DEFAULT_REUNIR);
        assertThat(testPolo.getLocalizacao()).isEqualTo(DEFAULT_LOCALIZACAO);

        // Validate the Polo in Elasticsearch
        Polo poloEs = poloSearchRepository.findOne(testPolo.getId());
        assertThat(poloEs).isEqualToIgnoringGivenFields(testPolo);
    }

    @Test
    @Transactional
    public void createPoloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = poloRepository.findAll().size();

        // Create the Polo with an existing ID
        polo.setId(1L);
        PoloDTO poloDTO = poloMapper.toDto(polo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPoloMockMvc.perform(post("/api/polos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(poloDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Polo in the database
        List<Polo> poloList = poloRepository.findAll();
        assertThat(poloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPolos() throws Exception {
        // Initialize the database
        poloRepository.saveAndFlush(polo);

        // Get all the poloList
        restPoloMockMvc.perform(get("/api/polos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(polo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].reunir").value(hasItem(DEFAULT_REUNIR.toString())))
            .andExpect(jsonPath("$.[*].localizacao").value(hasItem(DEFAULT_LOCALIZACAO.toString())));
    }

    @Test
    @Transactional
    public void getPolo() throws Exception {
        // Initialize the database
        poloRepository.saveAndFlush(polo);

        // Get the polo
        restPoloMockMvc.perform(get("/api/polos/{id}", polo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(polo.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.reunir").value(DEFAULT_REUNIR.toString()))
            .andExpect(jsonPath("$.localizacao").value(DEFAULT_LOCALIZACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPolo() throws Exception {
        // Get the polo
        restPoloMockMvc.perform(get("/api/polos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePolo() throws Exception {
        // Initialize the database
        poloRepository.saveAndFlush(polo);
        poloSearchRepository.save(polo);
        int databaseSizeBeforeUpdate = poloRepository.findAll().size();

        // Update the polo
        Polo updatedPolo = poloRepository.findOne(polo.getId());
        // Disconnect from session so that the updates on updatedPolo are not directly saved in db
        em.detach(updatedPolo);
        updatedPolo
            .nome(UPDATED_NOME)
            .numero(UPDATED_NUMERO)
            .reunir(UPDATED_REUNIR)
            .localizacao(UPDATED_LOCALIZACAO);
        PoloDTO poloDTO = poloMapper.toDto(updatedPolo);

        restPoloMockMvc.perform(put("/api/polos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(poloDTO)))
            .andExpect(status().isOk());

        // Validate the Polo in the database
        List<Polo> poloList = poloRepository.findAll();
        assertThat(poloList).hasSize(databaseSizeBeforeUpdate);
        Polo testPolo = poloList.get(poloList.size() - 1);
        assertThat(testPolo.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPolo.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testPolo.getReunir()).isEqualTo(UPDATED_REUNIR);
        assertThat(testPolo.getLocalizacao()).isEqualTo(UPDATED_LOCALIZACAO);

        // Validate the Polo in Elasticsearch
        Polo poloEs = poloSearchRepository.findOne(testPolo.getId());
        assertThat(poloEs).isEqualToIgnoringGivenFields(testPolo);
    }

    @Test
    @Transactional
    public void updateNonExistingPolo() throws Exception {
        int databaseSizeBeforeUpdate = poloRepository.findAll().size();

        // Create the Polo
        PoloDTO poloDTO = poloMapper.toDto(polo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPoloMockMvc.perform(put("/api/polos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(poloDTO)))
            .andExpect(status().isCreated());

        // Validate the Polo in the database
        List<Polo> poloList = poloRepository.findAll();
        assertThat(poloList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePolo() throws Exception {
        // Initialize the database
        poloRepository.saveAndFlush(polo);
        poloSearchRepository.save(polo);
        int databaseSizeBeforeDelete = poloRepository.findAll().size();

        // Get the polo
        restPoloMockMvc.perform(delete("/api/polos/{id}", polo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean poloExistsInEs = poloSearchRepository.exists(polo.getId());
        assertThat(poloExistsInEs).isFalse();

        // Validate the database is empty
        List<Polo> poloList = poloRepository.findAll();
        assertThat(poloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPolo() throws Exception {
        // Initialize the database
        poloRepository.saveAndFlush(polo);
        poloSearchRepository.save(polo);

        // Search the polo
        restPoloMockMvc.perform(get("/api/_search/polos?query=id:" + polo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(polo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].reunir").value(hasItem(DEFAULT_REUNIR.toString())))
            .andExpect(jsonPath("$.[*].localizacao").value(hasItem(DEFAULT_LOCALIZACAO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Polo.class);
        Polo polo1 = new Polo();
        polo1.setId(1L);
        Polo polo2 = new Polo();
        polo2.setId(polo1.getId());
        assertThat(polo1).isEqualTo(polo2);
        polo2.setId(2L);
        assertThat(polo1).isNotEqualTo(polo2);
        polo1.setId(null);
        assertThat(polo1).isNotEqualTo(polo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PoloDTO.class);
        PoloDTO poloDTO1 = new PoloDTO();
        poloDTO1.setId(1L);
        PoloDTO poloDTO2 = new PoloDTO();
        assertThat(poloDTO1).isNotEqualTo(poloDTO2);
        poloDTO2.setId(poloDTO1.getId());
        assertThat(poloDTO1).isEqualTo(poloDTO2);
        poloDTO2.setId(2L);
        assertThat(poloDTO1).isNotEqualTo(poloDTO2);
        poloDTO1.setId(null);
        assertThat(poloDTO1).isNotEqualTo(poloDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(poloMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(poloMapper.fromId(null)).isNull();
    }
}
