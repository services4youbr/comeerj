package br.com.services4you.comeerj.web.rest;

import br.com.services4you.comeerj.ComeerjApp;

import br.com.services4you.comeerj.domain.Alojamento;
import br.com.services4you.comeerj.repository.AlojamentoRepository;
import br.com.services4you.comeerj.service.AlojamentoService;
import br.com.services4you.comeerj.service.dto.AlojamentoDTO;
import br.com.services4you.comeerj.service.mapper.AlojamentoMapper;
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

import br.com.services4you.comeerj.domain.enumeration.Genero;
/**
 * Test class for the AlojamentoResource REST controller.
 *
 * @see AlojamentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeerjApp.class)
public class AlojamentoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SALA = "AAAAAAAAAA";
    private static final String UPDATED_SALA = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL = "BBBBBBBBBB";

    private static final Genero DEFAULT_GENERO = Genero.MASCULINO;
    private static final Genero UPDATED_GENERO = Genero.FEMININO;

    @Autowired
    private AlojamentoRepository alojamentoRepository;

    @Autowired
    private AlojamentoMapper alojamentoMapper;

    @Autowired
    private AlojamentoService alojamentoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlojamentoMockMvc;

    private Alojamento alojamento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlojamentoResource alojamentoResource = new AlojamentoResource(alojamentoService);
        this.restAlojamentoMockMvc = MockMvcBuilders.standaloneSetup(alojamentoResource)
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
    public static Alojamento createEntity(EntityManager em) {
        Alojamento alojamento = new Alojamento()
            .nome(DEFAULT_NOME)
            .sala(DEFAULT_SALA)
            .local(DEFAULT_LOCAL)
            .genero(DEFAULT_GENERO);
        return alojamento;
    }

    @Before
    public void initTest() {
        alojamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlojamento() throws Exception {
        int databaseSizeBeforeCreate = alojamentoRepository.findAll().size();

        // Create the Alojamento
        AlojamentoDTO alojamentoDTO = alojamentoMapper.toDto(alojamento);
        restAlojamentoMockMvc.perform(post("/api/alojamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alojamentoDTO)))
            .andExpect(status().isCreated());

        // Validate the Alojamento in the database
        List<Alojamento> alojamentoList = alojamentoRepository.findAll();
        assertThat(alojamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Alojamento testAlojamento = alojamentoList.get(alojamentoList.size() - 1);
        assertThat(testAlojamento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testAlojamento.getSala()).isEqualTo(DEFAULT_SALA);
        assertThat(testAlojamento.getLocal()).isEqualTo(DEFAULT_LOCAL);
        assertThat(testAlojamento.getGenero()).isEqualTo(DEFAULT_GENERO);
    }

    @Test
    @Transactional
    public void createAlojamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alojamentoRepository.findAll().size();

        // Create the Alojamento with an existing ID
        alojamento.setId(1L);
        AlojamentoDTO alojamentoDTO = alojamentoMapper.toDto(alojamento);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlojamentoMockMvc.perform(post("/api/alojamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alojamentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alojamento in the database
        List<Alojamento> alojamentoList = alojamentoRepository.findAll();
        assertThat(alojamentoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAlojamentos() throws Exception {
        // Initialize the database
        alojamentoRepository.saveAndFlush(alojamento);

        // Get all the alojamentoList
        restAlojamentoMockMvc.perform(get("/api/alojamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alojamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].sala").value(hasItem(DEFAULT_SALA.toString())))
            .andExpect(jsonPath("$.[*].local").value(hasItem(DEFAULT_LOCAL.toString())))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO.toString())));
    }

    @Test
    @Transactional
    public void getAlojamento() throws Exception {
        // Initialize the database
        alojamentoRepository.saveAndFlush(alojamento);

        // Get the alojamento
        restAlojamentoMockMvc.perform(get("/api/alojamentos/{id}", alojamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alojamento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.sala").value(DEFAULT_SALA.toString()))
            .andExpect(jsonPath("$.local").value(DEFAULT_LOCAL.toString()))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlojamento() throws Exception {
        // Get the alojamento
        restAlojamentoMockMvc.perform(get("/api/alojamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlojamento() throws Exception {
        // Initialize the database
        alojamentoRepository.saveAndFlush(alojamento);
        int databaseSizeBeforeUpdate = alojamentoRepository.findAll().size();

        // Update the alojamento
        Alojamento updatedAlojamento = alojamentoRepository.findOne(alojamento.getId());
        // Disconnect from session so that the updates on updatedAlojamento are not directly saved in db
        em.detach(updatedAlojamento);
        updatedAlojamento
            .nome(UPDATED_NOME)
            .sala(UPDATED_SALA)
            .local(UPDATED_LOCAL)
            .genero(UPDATED_GENERO);
        AlojamentoDTO alojamentoDTO = alojamentoMapper.toDto(updatedAlojamento);

        restAlojamentoMockMvc.perform(put("/api/alojamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alojamentoDTO)))
            .andExpect(status().isOk());

        // Validate the Alojamento in the database
        List<Alojamento> alojamentoList = alojamentoRepository.findAll();
        assertThat(alojamentoList).hasSize(databaseSizeBeforeUpdate);
        Alojamento testAlojamento = alojamentoList.get(alojamentoList.size() - 1);
        assertThat(testAlojamento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testAlojamento.getSala()).isEqualTo(UPDATED_SALA);
        assertThat(testAlojamento.getLocal()).isEqualTo(UPDATED_LOCAL);
        assertThat(testAlojamento.getGenero()).isEqualTo(UPDATED_GENERO);
    }

    @Test
    @Transactional
    public void updateNonExistingAlojamento() throws Exception {
        int databaseSizeBeforeUpdate = alojamentoRepository.findAll().size();

        // Create the Alojamento
        AlojamentoDTO alojamentoDTO = alojamentoMapper.toDto(alojamento);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlojamentoMockMvc.perform(put("/api/alojamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alojamentoDTO)))
            .andExpect(status().isCreated());

        // Validate the Alojamento in the database
        List<Alojamento> alojamentoList = alojamentoRepository.findAll();
        assertThat(alojamentoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAlojamento() throws Exception {
        // Initialize the database
        alojamentoRepository.saveAndFlush(alojamento);
        int databaseSizeBeforeDelete = alojamentoRepository.findAll().size();

        // Get the alojamento
        restAlojamentoMockMvc.perform(delete("/api/alojamentos/{id}", alojamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Alojamento> alojamentoList = alojamentoRepository.findAll();
        assertThat(alojamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alojamento.class);
        Alojamento alojamento1 = new Alojamento();
        alojamento1.setId(1L);
        Alojamento alojamento2 = new Alojamento();
        alojamento2.setId(alojamento1.getId());
        assertThat(alojamento1).isEqualTo(alojamento2);
        alojamento2.setId(2L);
        assertThat(alojamento1).isNotEqualTo(alojamento2);
        alojamento1.setId(null);
        assertThat(alojamento1).isNotEqualTo(alojamento2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlojamentoDTO.class);
        AlojamentoDTO alojamentoDTO1 = new AlojamentoDTO();
        alojamentoDTO1.setId(1L);
        AlojamentoDTO alojamentoDTO2 = new AlojamentoDTO();
        assertThat(alojamentoDTO1).isNotEqualTo(alojamentoDTO2);
        alojamentoDTO2.setId(alojamentoDTO1.getId());
        assertThat(alojamentoDTO1).isEqualTo(alojamentoDTO2);
        alojamentoDTO2.setId(2L);
        assertThat(alojamentoDTO1).isNotEqualTo(alojamentoDTO2);
        alojamentoDTO1.setId(null);
        assertThat(alojamentoDTO1).isNotEqualTo(alojamentoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(alojamentoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(alojamentoMapper.fromId(null)).isNull();
    }
}
