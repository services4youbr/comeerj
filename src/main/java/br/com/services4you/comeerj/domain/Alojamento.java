package br.com.services4you.comeerj.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.com.services4you.comeerj.domain.enumeration.Genero;

/**
 * A Alojamento.
 */
@Entity
@Table(name = "alojamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Alojamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sala")
    private String sala;

    @Column(name = "jhi_local")
    private String local;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero")
    private Genero genero;

    @OneToOne
    @JoinColumn(unique = true)
    private Inscricao responsavel;

    @OneToMany(mappedBy = "alojamento")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> inscritos = new HashSet<>();

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

    public Alojamento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSala() {
        return sala;
    }

    public Alojamento sala(String sala) {
        this.sala = sala;
        return this;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getLocal() {
        return local;
    }

    public Alojamento local(String local) {
        this.local = local;
        return this;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public Genero getGenero() {
        return genero;
    }

    public Alojamento genero(Genero genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Inscricao getResponsavel() {
        return responsavel;
    }

    public Alojamento responsavel(Inscricao inscricao) {
        this.responsavel = inscricao;
        return this;
    }

    public void setResponsavel(Inscricao inscricao) {
        this.responsavel = inscricao;
    }

    public Set<Inscricao> getInscritos() {
        return inscritos;
    }

    public Alojamento inscritos(Set<Inscricao> inscricaos) {
        this.inscritos = inscricaos;
        return this;
    }

    public Alojamento addInscritos(Inscricao inscricao) {
        this.inscritos.add(inscricao);
        inscricao.setAlojamento(this);
        return this;
    }

    public Alojamento removeInscritos(Inscricao inscricao) {
        this.inscritos.remove(inscricao);
        inscricao.setAlojamento(null);
        return this;
    }

    public void setInscritos(Set<Inscricao> inscricaos) {
        this.inscritos = inscricaos;
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
        Alojamento alojamento = (Alojamento) o;
        if (alojamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alojamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Alojamento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sala='" + getSala() + "'" +
            ", local='" + getLocal() + "'" +
            ", genero='" + getGenero() + "'" +
            "}";
    }
}
