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
 * A Polo.
 */
@Entity
@Table(name = "polo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Polo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numero")
    private String numero;

    @Column(name = "reunir")
    private String reunir;

    @Column(name = "localizacao")
    private String localizacao;

    @OneToMany(mappedBy = "polo")
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

    public String getNome() {
        return nome;
    }

    public Polo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumero() {
        return numero;
    }

    public Polo numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getReunir() {
        return reunir;
    }

    public Polo reunir(String reunir) {
        this.reunir = reunir;
        return this;
    }

    public void setReunir(String reunir) {
        this.reunir = reunir;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public Polo localizacao(String localizacao) {
        this.localizacao = localizacao;
        return this;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Set<Inscricao> getInscricoes() {
        return inscricoes;
    }

    public Polo inscricoes(Set<Inscricao> inscricaos) {
        this.inscricoes = inscricaos;
        return this;
    }

    public Polo addInscricoes(Inscricao inscricao) {
        this.inscricoes.add(inscricao);
        inscricao.setPolo(this);
        return this;
    }

    public Polo removeInscricoes(Inscricao inscricao) {
        this.inscricoes.remove(inscricao);
        inscricao.setPolo(null);
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
        Polo polo = (Polo) o;
        if (polo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), polo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Polo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", numero='" + getNumero() + "'" +
            ", reunir='" + getReunir() + "'" +
            ", localizacao='" + getLocalizacao() + "'" +
            "}";
    }
}
