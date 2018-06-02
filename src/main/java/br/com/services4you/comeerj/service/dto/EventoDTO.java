package br.com.services4you.comeerj.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Evento entity.
 */
public class EventoDTO implements Serializable {

    private Long id;

    private String versao;

    private String tema;

    private Instant inicioEvento;

    private Instant fimEvento;

    private Instant inicioInscricoes;

    private Instant fimInscricoes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersao() {
        return versao;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public Instant getInicioEvento() {
        return inicioEvento;
    }

    public void setInicioEvento(Instant inicioEvento) {
        this.inicioEvento = inicioEvento;
    }

    public Instant getFimEvento() {
        return fimEvento;
    }

    public void setFimEvento(Instant fimEvento) {
        this.fimEvento = fimEvento;
    }

    public Instant getInicioInscricoes() {
        return inicioInscricoes;
    }

    public void setInicioInscricoes(Instant inicioInscricoes) {
        this.inicioInscricoes = inicioInscricoes;
    }

    public Instant getFimInscricoes() {
        return fimInscricoes;
    }

    public void setFimInscricoes(Instant fimInscricoes) {
        this.fimInscricoes = fimInscricoes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EventoDTO eventoDTO = (EventoDTO) o;
        if(eventoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eventoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EventoDTO{" +
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
