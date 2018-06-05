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
 * A Comissao.
 */
@Entity
@Table(name = "comissao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comissao")
    private String comissao;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @OneToMany(mappedBy = "comissao")
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

    public String getComissao() {
        return comissao;
    }

    public Comissao comissao(String comissao) {
        this.comissao = comissao;
        return this;
    }

    public void setComissao(String comissao) {
        this.comissao = comissao;
    }

    public String getNome() {
        return nome;
    }

    public Comissao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Comissao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Inscricao> getInscricoes() {
        return inscricoes;
    }

    public Comissao inscricoes(Set<Inscricao> inscricaos) {
        this.inscricoes = inscricaos;
        return this;
    }

    public Comissao addInscricoes(Inscricao inscricao) {
        this.inscricoes.add(inscricao);
        inscricao.setComissao(this);
        return this;
    }

    public Comissao removeInscricoes(Inscricao inscricao) {
        this.inscricoes.remove(inscricao);
        inscricao.setComissao(null);
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
        Comissao comissao = (Comissao) o;
        if (comissao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comissao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comissao{" +
            "id=" + getId() +
            ", comissao='" + getComissao() + "'" +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
