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
 * A FaixaEtaria.
 */
@Entity
@Table(name = "faixa_etaria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FaixaEtaria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "idade_min")
    private Long idadeMin;

    @Column(name = "idade_maxima")
    private Long idadeMaxima;

    @Column(name = "descricao")
    private String descricao;

    @OneToMany(mappedBy = "faixaEtaria")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Turma> turmas = new HashSet<>();

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

    public FaixaEtaria nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getIdadeMin() {
        return idadeMin;
    }

    public FaixaEtaria idadeMin(Long idadeMin) {
        this.idadeMin = idadeMin;
        return this;
    }

    public void setIdadeMin(Long idadeMin) {
        this.idadeMin = idadeMin;
    }

    public Long getIdadeMaxima() {
        return idadeMaxima;
    }

    public FaixaEtaria idadeMaxima(Long idadeMaxima) {
        this.idadeMaxima = idadeMaxima;
        return this;
    }

    public void setIdadeMaxima(Long idadeMaxima) {
        this.idadeMaxima = idadeMaxima;
    }

    public String getDescricao() {
        return descricao;
    }

    public FaixaEtaria descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Turma> getTurmas() {
        return turmas;
    }

    public FaixaEtaria turmas(Set<Turma> turmas) {
        this.turmas = turmas;
        return this;
    }

    public FaixaEtaria addTurmas(Turma turma) {
        this.turmas.add(turma);
        turma.setFaixaEtaria(this);
        return this;
    }

    public FaixaEtaria removeTurmas(Turma turma) {
        this.turmas.remove(turma);
        turma.setFaixaEtaria(null);
        return this;
    }

    public void setTurmas(Set<Turma> turmas) {
        this.turmas = turmas;
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
        FaixaEtaria faixaEtaria = (FaixaEtaria) o;
        if (faixaEtaria.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), faixaEtaria.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FaixaEtaria{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", idadeMin=" + getIdadeMin() +
            ", idadeMaxima=" + getIdadeMaxima() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
