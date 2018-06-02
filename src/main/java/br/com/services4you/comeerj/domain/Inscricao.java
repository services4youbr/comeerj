package br.com.services4you.comeerj.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import br.com.services4you.comeerj.domain.enumeration.TipoParticicao;

/**
 * A Inscricao.
 */
@Entity
@Table(name = "inscricao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "inscricao")
public class Inscricao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_participacao")
    private TipoParticicao tipoParticipacao;

    @Column(name = "idade")
    private Long idade;

    @Column(name = "numero_participacoes")
    private Long numeroParticipacoes;

    @OneToOne(mappedBy = "responsavel")
    @JsonIgnore
    private Alojamento alojamentoResponsavel;

    @ManyToOne
    private Polo polo;

    @ManyToOne
    private Evento evento;

    @ManyToOne
    private Comissao comissao;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Turma turma;

    @ManyToOne
    private Turma responsavel;

    @ManyToOne
    private Alojamento alojamento;

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

    public Inscricao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoParticicao getTipoParticipacao() {
        return tipoParticipacao;
    }

    public Inscricao tipoParticipacao(TipoParticicao tipoParticipacao) {
        this.tipoParticipacao = tipoParticipacao;
        return this;
    }

    public void setTipoParticipacao(TipoParticicao tipoParticipacao) {
        this.tipoParticipacao = tipoParticipacao;
    }

    public Long getIdade() {
        return idade;
    }

    public Inscricao idade(Long idade) {
        this.idade = idade;
        return this;
    }

    public void setIdade(Long idade) {
        this.idade = idade;
    }

    public Long getNumeroParticipacoes() {
        return numeroParticipacoes;
    }

    public Inscricao numeroParticipacoes(Long numeroParticipacoes) {
        this.numeroParticipacoes = numeroParticipacoes;
        return this;
    }

    public void setNumeroParticipacoes(Long numeroParticipacoes) {
        this.numeroParticipacoes = numeroParticipacoes;
    }

    public Alojamento getAlojamentoResponsavel() {
        return alojamentoResponsavel;
    }

    public Inscricao alojamentoResponsavel(Alojamento alojamento) {
        this.alojamentoResponsavel = alojamento;
        return this;
    }

    public void setAlojamentoResponsavel(Alojamento alojamento) {
        this.alojamentoResponsavel = alojamento;
    }

    public Polo getPolo() {
        return polo;
    }

    public Inscricao polo(Polo polo) {
        this.polo = polo;
        return this;
    }

    public void setPolo(Polo polo) {
        this.polo = polo;
    }

    public Evento getEvento() {
        return evento;
    }

    public Inscricao evento(Evento evento) {
        this.evento = evento;
        return this;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Comissao getComissao() {
        return comissao;
    }

    public Inscricao comissao(Comissao comissao) {
        this.comissao = comissao;
        return this;
    }

    public void setComissao(Comissao comissao) {
        this.comissao = comissao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Inscricao usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Turma getTurma() {
        return turma;
    }

    public Inscricao turma(Turma turma) {
        this.turma = turma;
        return this;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Turma getResponsavel() {
        return responsavel;
    }

    public Inscricao responsavel(Turma turma) {
        this.responsavel = turma;
        return this;
    }

    public void setResponsavel(Turma turma) {
        this.responsavel = turma;
    }

    public Alojamento getAlojamento() {
        return alojamento;
    }

    public Inscricao alojamento(Alojamento alojamento) {
        this.alojamento = alojamento;
        return this;
    }

    public void setAlojamento(Alojamento alojamento) {
        this.alojamento = alojamento;
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
        Inscricao inscricao = (Inscricao) o;
        if (inscricao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscricao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inscricao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipoParticipacao='" + getTipoParticipacao() + "'" +
            ", idade=" + getIdade() +
            ", numeroParticipacoes=" + getNumeroParticipacoes() +
            "}";
    }
}
