package br.com.services4you.comeerj.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "turma")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> inscritos = new HashSet<>();

    @OneToMany(mappedBy = "responsavel")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> evangelizadores = new HashSet<>();

    @ManyToOne
    private FaixaEtaria faixaEtaria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Turma nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Inscricao> getInscritos() {
        return inscritos;
    }

    public Turma inscritos(Set<Inscricao> inscricaos) {
        this.inscritos = inscricaos;
        return this;
    }

    public Turma addInscritos(Inscricao inscricao) {
        this.inscritos.add(inscricao);
        inscricao.setTurma(this);
        return this;
    }

    public Turma removeInscritos(Inscricao inscricao) {
        this.inscritos.remove(inscricao);
        inscricao.setTurma(null);
        return this;
    }

    public void setInscritos(Set<Inscricao> inscricaos) {
        this.inscritos = inscricaos;
    }

    public Set<Inscricao> getEvangelizadores() {
        return evangelizadores;
    }

    public Turma evangelizadores(Set<Inscricao> inscricaos) {
        this.evangelizadores = inscricaos;
        return this;
    }

    public Turma addEvangelizadores(Inscricao inscricao) {
        this.evangelizadores.add(inscricao);
        inscricao.setResponsavel(this);
        return this;
    }

    public Turma removeEvangelizadores(Inscricao inscricao) {
        this.evangelizadores.remove(inscricao);
        inscricao.setResponsavel(null);
        return this;
    }

    public void setEvangelizadores(Set<Inscricao> inscricaos) {
        this.evangelizadores = inscricaos;
    }

    public FaixaEtaria getFaixaEtaria() {
        return faixaEtaria;
    }

    public Turma faixaEtaria(FaixaEtaria faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
        return this;
    }

    public void setFaixaEtaria(FaixaEtaria faixaEtaria) {
        this.faixaEtaria = faixaEtaria;
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
        Turma turma = (Turma) o;
        if (turma.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turma.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
