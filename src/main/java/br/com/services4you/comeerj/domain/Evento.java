package br.com.services4you.comeerj.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "versao")
    private String versao;

    @Column(name = "tema")
    private String tema;

    @Column(name = "inicio_evento")
    private Instant inicioEvento;

    @Column(name = "fim_evento")
    private Instant fimEvento;

    @Column(name = "inicio_inscricoes")
    private Instant inicioInscricoes;

    @Column(name = "fim_inscricoes")
    private Instant fimInscricoes;

    @OneToMany(mappedBy = "evento")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> inscricoes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersao() {
        return versao;
    }

    public Evento versao(String versao) {
        this.versao = versao;
        return this;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }

    public String getTema() {
        return tema;
    }

    public Evento tema(String tema) {
        this.tema = tema;
        return this;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public Instant getInicioEvento() {
        return inicioEvento;
    }

    public Evento inicioEvento(Instant inicioEvento) {
        this.inicioEvento = inicioEvento;
        return this;
    }

    public void setInicioEvento(Instant inicioEvento) {
        this.inicioEvento = inicioEvento;
    }

    public Instant getFimEvento() {
        return fimEvento;
    }

    public Evento fimEvento(Instant fimEvento) {
        this.fimEvento = fimEvento;
        return this;
    }

    public void setFimEvento(Instant fimEvento) {
        this.fimEvento = fimEvento;
    }

    public Instant getInicioInscricoes() {
        return inicioInscricoes;
    }

    public Evento inicioInscricoes(Instant inicioInscricoes) {
        this.inicioInscricoes = inicioInscricoes;
        return this;
    }

    public void setInicioInscricoes(Instant inicioInscricoes) {
        this.inicioInscricoes = inicioInscricoes;
    }

    public Instant getFimInscricoes() {
        return fimInscricoes;
    }

    public Evento fimInscricoes(Instant fimInscricoes) {
        this.fimInscricoes = fimInscricoes;
        return this;
    }

    public void setFimInscricoes(Instant fimInscricoes) {
        this.fimInscricoes = fimInscricoes;
    }

    public Set<Inscricao> getInscricoes() {
        return inscricoes;
    }

    public Evento inscricoes(Set<Inscricao> inscricaos) {
        this.inscricoes = inscricaos;
        return this;
    }

    public Evento addInscricoes(Inscricao inscricao) {
        this.inscricoes.add(inscricao);
        inscricao.setEvento(this);
        return this;
    }

    public Evento removeInscricoes(Inscricao inscricao) {
        this.inscricoes.remove(inscricao);
        inscricao.setEvento(null);
        return this;
    }

    public void setInscricoes(Set<Inscricao> inscricaos) {
        this.inscricoes = inscricaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Evento evento = (Evento) o;
        if (evento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", versao='" + getVersao() + "'" +
            ", tema='" + getTema() + "'" +
            ", inicioEvento='" + getInicioEvento() + "'" +
            ", fimEvento='" + getFimEvento() + "'" +
            ", inicioInscricoes='" + getInicioInscricoes() + "'" +
            ", fimInscricoes='" + getFimInscricoes() + "'" +
            "}";
    }
}
