package br.com.services4you.comeerj.web.rest;

import br.com.services4you.comeerj.ComeerjApp;

import br.com.services4you.comeerj.domain.Inscricao;
import br.com.services4you.comeerj.repository.InscricaoRepository;
import br.com.services4you.comeerj.service.InscricaoService;
import br.com.services4you.comeerj.service.dto.InscricaoDTO;
import br.com.services4you.comeerj.service.mapper.InscricaoMapper;
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

import br.com.services4you.comeerj.domain.enumeration.TipoParticicao;
/**
 * Test class for the InscricaoResource REST controller.
 *
 * @see InscricaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeerjApp.class)
public class InscricaoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final TipoParticicao DEFAULT_TIPO_PARTICIPACAO = TipoParticicao.CONFRATERNISTA;
    private static final TipoParticicao UPDATED_TIPO_PARTICIPACAO = TipoParticicao.TRABALHADOR;

    private static final Long DEFAULT_IDADE = 1L;
    private static final Long UPDATED_IDADE = 2L;

    private static final Long DEFAULT_NUMERO_PARTICIPACOES = 1L;
    private static final Long UPDATED_NUMERO_PARTICIPACOES = 2L;

    @Autowired
    private InscricaoRepository inscricaoRepository;

    @Autowired
    private InscricaoMapper inscricaoMapper;

    @Autowired
    private InscricaoService inscricaoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInscricaoMockMvc;

    private Inscricao inscricao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InscricaoResource inscricaoResource = new InscricaoResource(inscricaoService);
        this.restInscricaoMockMvc = MockMvcBuilders.standaloneSetup(inscricaoResource)
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
    public static Inscricao createEntity(EntityManager em) {
        Inscricao inscricao = new Inscricao()
            .nome(DEFAULT_NOME)
            .tipoParticipacao(DEFAULT_TIPO_PARTICIPACAO)
            .idade(DEFAULT_IDADE)
            .numeroParticipacoes(DEFAULT_NUMERO_PARTICIPACOES);
        return inscricao;
    }

    @Before
    public void initTest() {
        inscricao = createEntity(em);
    }

    @Test
    @Transactional
    public void createInscricao() throws Exception {
        int databaseSizeBeforeCreate = inscricaoRepository.findAll().size();

        // Create the Inscricao
        InscricaoDTO inscricaoDTO = inscricaoMapper.toDto(inscricao);
        restInscricaoMockMvc.perform(post("/api/inscricaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscricaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Inscricao in the database
        List<Inscricao> inscricaoList = inscricaoRepository.findAll();
        assertThat(inscricaoList).hasSize(databaseSizeBeforeCreate + 1);
        Inscricao testInscricao = inscricaoList.get(inscricaoList.size() - 1);
        assertThat(testInscricao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testInscricao.getTipoParticipacao()).isEqualTo(DEFAULT_TIPO_PARTICIPACAO);
        assertThat(testInscricao.getIdade()).isEqualTo(DEFAULT_IDADE);
        assertThat(testInscricao.getNumeroParticipacoes()).isEqualTo(DEFAULT_NUMERO_PARTICIPACOES);
    }

    @Test
    @Transactional
    public void createInscricaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inscricaoRepository.findAll().size();

        // Create the Inscricao with an existing ID
        inscricao.setId(1L);
        InscricaoDTO inscricaoDTO = inscricaoMapper.toDto(inscricao);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscricaoMockMvc.perform(post("/api/inscricaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscricaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Inscricao in the database
        List<Inscricao> inscricaoList = inscricaoRepository.findAll();
        assertThat(inscricaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInscricaos() throws Exception {
        // Initialize the database
        inscricaoRepository.saveAndFlush(inscricao);

        // Get all the inscricaoList
        restInscricaoMockMvc.perform(get("/api/inscricaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscricao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].tipoParticipacao").value(hasItem(DEFAULT_TIPO_PARTICIPACAO.toString())))
            .andExpect(jsonPath("$.[*].idade").value(hasItem(DEFAULT_IDADE.intValue())))
            .andExpect(jsonPath("$.[*].numeroParticipacoes").value(hasItem(DEFAULT_NUMERO_PARTICIPACOES.intValue())));
    }

    @Test
    @Transactional
    public void getInscricao() throws Exception {
        // Initialize the database
        inscricaoRepository.saveAndFlush(inscricao);

        // Get the inscricao
        restInscricaoMockMvc.perform(get("/api/inscricaos/{id}", inscricao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inscricao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.tipoParticipacao").value(DEFAULT_TIPO_PARTICIPACAO.toString()))
            .andExpect(jsonPath("$.idade").value(DEFAULT_IDADE.intValue()))
            .andExpect(jsonPath("$.numeroParticipacoes").value(DEFAULT_NUMERO_PARTICIPACOES.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInscricao() throws Exception {
        // Get the inscricao
        restInscricaoMockMvc.perform(get("/api/inscricaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInscricao() throws Exception {
        // Initialize the database
        inscricaoRepository.saveAndFlush(inscricao);
        int databaseSizeBeforeUpdate = inscricaoRepository.findAll().size();

        // Update the inscricao
        Inscricao updatedInscricao = inscricaoRepository.findOne(inscricao.getId());
        // Disconnect from session so that the updates on updatedInscricao are not directly saved in db
        em.detach(updatedInscricao);
        updatedInscricao
            .nome(UPDATED_NOME)
            .tipoParticipacao(UPDATED_TIPO_PARTICIPACAO)
            .idade(UPDATED_IDADE)
            .numeroParticipacoes(UPDATED_NUMERO_PARTICIPACOES);
        InscricaoDTO inscricaoDTO = inscricaoMapper.toDto(updatedInscricao);

        restInscricaoMockMvc.perform(put("/api/inscricaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscricaoDTO)))
            .andExpect(status().isOk());

        // Validate the Inscricao in the database
        List<Inscricao> inscricaoList = inscricaoRepository.findAll();
        assertThat(inscricaoList).hasSize(databaseSizeBeforeUpdate);
        Inscricao testInscricao = inscricaoList.get(inscricaoList.size() - 1);
        assertThat(testInscricao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testInscricao.getTipoParticipacao()).isEqualTo(UPDATED_TIPO_PARTICIPACAO);
        assertThat(testInscricao.getIdade()).isEqualTo(UPDATED_IDADE);
        assertThat(testInscricao.getNumeroParticipacoes()).isEqualTo(UPDATED_NUMERO_PARTICIPACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingInscricao() throws Exception {
        int databaseSizeBeforeUpdate = inscricaoRepository.findAll().size();

        // Create the Inscricao
        InscricaoDTO inscricaoDTO = inscricaoMapper.toDto(inscricao);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInscricaoMockMvc.perform(put("/api/inscricaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscricaoDTO)))
            .andExpect(status().isCreated());

        // Validate the Inscricao in the database
        List<Inscricao> inscricaoList = inscricaoRepository.findAll();
        assertThat(inscricaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInscricao() throws Exception {
        // Initialize the database
        inscricaoRepository.saveAndFlush(inscricao);
        int databaseSizeBeforeDelete = inscricaoRepository.findAll().size();

        // Get the inscricao
        restInscricaoMockMvc.perform(delete("/api/inscricaos/{id}", inscricao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Inscricao> inscricaoList = inscricaoRepository.findAll();
        assertThat(inscricaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inscricao.class);
        Inscricao inscricao1 = new Inscricao();
        inscricao1.setId(1L);
        Inscricao inscricao2 = new Inscricao();
        inscricao2.setId(inscricao1.getId());
        assertThat(inscricao1).isEqualTo(inscricao2);
        inscricao2.setId(2L);
        assertThat(inscricao1).isNotEqualTo(inscricao2);
        inscricao1.setId(null);
        assertThat(inscricao1).isNotEqualTo(inscricao2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InscricaoDTO.class);
        InscricaoDTO inscricaoDTO1 = new InscricaoDTO();
        inscricaoDTO1.setId(1L);
        InscricaoDTO inscricaoDTO2 = new InscricaoDTO();
        assertThat(inscricaoDTO1).isNotEqualTo(inscricaoDTO2);
        inscricaoDTO2.setId(inscricaoDTO1.getId());
        assertThat(inscricaoDTO1).isEqualTo(inscricaoDTO2);
        inscricaoDTO2.setId(2L);
        assertThat(inscricaoDTO1).isNotEqualTo(inscricaoDTO2);
        inscricaoDTO1.setId(null);
        assertThat(inscricaoDTO1).isNotEqualTo(inscricaoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(inscricaoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(inscricaoMapper.fromId(null)).isNull();
    }
}
