package br.com.services4you.comeerj.web.rest;

import br.com.services4you.comeerj.ComeerjApp;

import br.com.services4you.comeerj.domain.Evento;
import br.com.services4you.comeerj.repository.EventoRepository;
import br.com.services4you.comeerj.service.EventoService;
import br.com.services4you.comeerj.service.dto.EventoDTO;
import br.com.services4you.comeerj.service.mapper.EventoMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.services4you.comeerj.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EventoResource REST controller.
 *
 * @see EventoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeerjApp.class)
public class EventoResourceIntTest {

    private static final String DEFAULT_VERSAO = "AAAAAAAAAA";
    private static final String UPDATED_VERSAO = "BBBBBBBBBB";

    private static final String DEFAULT_TEMA = "AAAAAAAAAA";
    private static final String UPDATED_TEMA = "BBBBBBBBBB";

    private static final Instant DEFAULT_INICIO_EVENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO_EVENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FIM_EVENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FIM_EVENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_INICIO_INSCRICOES = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO_INSCRICOES = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FIM_INSCRICOES = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FIM_INSCRICOES = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoMapper eventoMapper;

    @Autowired
    private EventoService eventoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventoMockMvc;

    private Evento evento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventoResource eventoResource = new EventoResource(eventoService);
        this.restEventoMockMvc = MockMvcBuilders.standaloneSetup(eventoResource)
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
    public static Evento createEntity(EntityManager em) {
        Evento evento = new Evento()
            .versao(DEFAULT_VERSAO)
            .tema(DEFAULT_TEMA)
            .inicioEvento(DEFAULT_INICIO_EVENTO)
            .fimEvento(DEFAULT_FIM_EVENTO)
            .inicioInscricoes(DEFAULT_INICIO_INSCRICOES)
            .fimInscricoes(DEFAULT_FIM_INSCRICOES);
        return evento;
    }

    @Before
    public void initTest() {
        evento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvento() throws Exception {
        int databaseSizeBeforeCreate = eventoRepository.findAll().size();

        // Create the Evento
        EventoDTO eventoDTO = eventoMapper.toDto(evento);
        restEventoMockMvc.perform(post("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoDTO)))
            .andExpect(status().isCreated());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeCreate + 1);
        Evento testEvento = eventoList.get(eventoList.size() - 1);
        assertThat(testEvento.getVersao()).isEqualTo(DEFAULT_VERSAO);
        assertThat(testEvento.getTema()).isEqualTo(DEFAULT_TEMA);
        assertThat(testEvento.getInicioEvento()).isEqualTo(DEFAULT_INICIO_EVENTO);
        assertThat(testEvento.getFimEvento()).isEqualTo(DEFAULT_FIM_EVENTO);
        assertThat(testEvento.getInicioInscricoes()).isEqualTo(DEFAULT_INICIO_INSCRICOES);
        assertThat(testEvento.getFimInscricoes()).isEqualTo(DEFAULT_FIM_INSCRICOES);
    }

    @Test
    @Transactional
    public void createEventoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventoRepository.findAll().size();

        // Create the Evento with an existing ID
        evento.setId(1L);
        EventoDTO eventoDTO = eventoMapper.toDto(evento);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventoMockMvc.perform(post("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEventos() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);

        // Get all the eventoList
        restEventoMockMvc.perform(get("/api/eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evento.getId().intValue())))
            .andExpect(jsonPath("$.[*].versao").value(hasItem(DEFAULT_VERSAO.toString())))
            .andExpect(jsonPath("$.[*].tema").value(hasItem(DEFAULT_TEMA.toString())))
            .andExpect(jsonPath("$.[*].inicioEvento").value(hasItem(DEFAULT_INICIO_EVENTO.toString())))
            .andExpect(jsonPath("$.[*].fimEvento").value(hasItem(DEFAULT_FIM_EVENTO.toString())))
            .andExpect(jsonPath("$.[*].inicioInscricoes").value(hasItem(DEFAULT_INICIO_INSCRICOES.toString())))
            .andExpect(jsonPath("$.[*].fimInscricoes").value(hasItem(DEFAULT_FIM_INSCRICOES.toString())));
    }

    @Test
    @Transactional
    public void getEvento() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);

        // Get the evento
        restEventoMockMvc.perform(get("/api/eventos/{id}", evento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evento.getId().intValue()))
            .andExpect(jsonPath("$.versao").value(DEFAULT_VERSAO.toString()))
            .andExpect(jsonPath("$.tema").value(DEFAULT_TEMA.toString()))
            .andExpect(jsonPath("$.inicioEvento").value(DEFAULT_INICIO_EVENTO.toString()))
            .andExpect(jsonPath("$.fimEvento").value(DEFAULT_FIM_EVENTO.toString()))
            .andExpect(jsonPath("$.inicioInscricoes").value(DEFAULT_INICIO_INSCRICOES.toString()))
            .andExpect(jsonPath("$.fimInscricoes").value(DEFAULT_FIM_INSCRICOES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvento() throws Exception {
        // Get the evento
        restEventoMockMvc.perform(get("/api/eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvento() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);
        int databaseSizeBeforeUpdate = eventoRepository.findAll().size();

        // Update the evento
        Evento updatedEvento = eventoRepository.findOne(evento.getId());
        // Disconnect from session so that the updates on updatedEvento are not directly saved in db
        em.detach(updatedEvento);
        updatedEvento
            .versao(UPDATED_VERSAO)
            .tema(UPDATED_TEMA)
            .inicioEvento(UPDATED_INICIO_EVENTO)
            .fimEvento(UPDATED_FIM_EVENTO)
            .inicioInscricoes(UPDATED_INICIO_INSCRICOES)
            .fimInscricoes(UPDATED_FIM_INSCRICOES);
        EventoDTO eventoDTO = eventoMapper.toDto(updatedEvento);

        restEventoMockMvc.perform(put("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoDTO)))
            .andExpect(status().isOk());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeUpdate);
        Evento testEvento = eventoList.get(eventoList.size() - 1);
        assertThat(testEvento.getVersao()).isEqualTo(UPDATED_VERSAO);
        assertThat(testEvento.getTema()).isEqualTo(UPDATED_TEMA);
        assertThat(testEvento.getInicioEvento()).isEqualTo(UPDATED_INICIO_EVENTO);
        assertThat(testEvento.getFimEvento()).isEqualTo(UPDATED_FIM_EVENTO);
        assertThat(testEvento.getInicioInscricoes()).isEqualTo(UPDATED_INICIO_INSCRICOES);
        assertThat(testEvento.getFimInscricoes()).isEqualTo(UPDATED_FIM_INSCRICOES);
    }

    @Test
    @Transactional
    public void updateNonExistingEvento() throws Exception {
        int databaseSizeBeforeUpdate = eventoRepository.findAll().size();

        // Create the Evento
        EventoDTO eventoDTO = eventoMapper.toDto(evento);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEventoMockMvc.perform(put("/api/eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoDTO)))
            .andExpect(status().isCreated());

        // Validate the Evento in the database
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEvento() throws Exception {
        // Initialize the database
        eventoRepository.saveAndFlush(evento);
        int databaseSizeBeforeDelete = eventoRepository.findAll().size();

        // Get the evento
        restEventoMockMvc.perform(delete("/api/eventos/{id}", evento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Evento> eventoList = eventoRepository.findAll();
        assertThat(eventoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evento.class);
        Evento evento1 = new Evento();
        evento1.setId(1L);
        Evento evento2 = new Evento();
        evento2.setId(evento1.getId());
        assertThat(evento1).isEqualTo(evento2);
        evento2.setId(2L);
        assertThat(evento1).isNotEqualTo(evento2);
        evento1.setId(null);
        assertThat(evento1).isNotEqualTo(evento2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventoDTO.class);
        EventoDTO eventoDTO1 = new EventoDTO();
        eventoDTO1.setId(1L);
        EventoDTO eventoDTO2 = new EventoDTO();
        assertThat(eventoDTO1).isNotEqualTo(eventoDTO2);
        eventoDTO2.setId(eventoDTO1.getId());
        assertThat(eventoDTO1).isEqualTo(eventoDTO2);
        eventoDTO2.setId(2L);
        assertThat(eventoDTO1).isNotEqualTo(eventoDTO2);
        eventoDTO1.setId(null);
        assertThat(eventoDTO1).isNotEqualTo(eventoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(eventoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(eventoMapper.fromId(null)).isNull();
    }
}
