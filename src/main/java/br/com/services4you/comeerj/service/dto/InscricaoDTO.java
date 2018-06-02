package br.com.services4you.comeerj.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import br.com.services4you.comeerj.domain.enumeration.TipoParticicao;

/**
 * A DTO for the Inscricao entity.
 */
public class InscricaoDTO implements Serializable {

    private Long id;

    private String nome;

    private TipoParticicao tipoParticipacao;

    private Long idade;

    private Long numeroParticipacoes;

    private Long poloId;

    private Long eventoId;

    private Long comissaoId;

    private Long usuarioId;

    private Long turmaId;

    private Long responsavelId;

    private Long alojamentoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoParticicao getTipoParticipacao() {
        return tipoParticipacao;
    }

    public void setTipoParticipacao(TipoParticicao tipoParticipacao) {
        this.tipoParticipacao = tipoParticipacao;
    }

    public Long getIdade() {
        return idade;
    }

    public void setIdade(Long idade) {
        this.idade = idade;
    }

    public Long getNumeroParticipacoes() {
        return numeroParticipacoes;
    }

    public void setNumeroParticipacoes(Long numeroParticipacoes) {
        this.numeroParticipacoes = numeroParticipacoes;
    }

    public Long getPoloId() {
        return poloId;
    }

    public void setPoloId(Long poloId) {
        this.poloId = poloId;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }

    public Long getComissaoId() {
        return comissaoId;
    }

    public void setComissaoId(Long comissaoId) {
        this.comissaoId = comissaoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getTurmaId() {
        return turmaId;
    }

    public void setTurmaId(Long turmaId) {
        this.turmaId = turmaId;
    }

    public Long getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(Long turmaId) {
        this.responsavelId = turmaId;
    }

    public Long getAlojamentoId() {
        return alojamentoId;
    }

    public void setAlojamentoId(Long alojamentoId) {
        this.alojamentoId = alojamentoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InscricaoDTO inscricaoDTO = (InscricaoDTO) o;
        if(inscricaoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscricaoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InscricaoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipoParticipacao='" + getTipoParticipacao() + "'" +
            ", idade=" + getIdade() +
            ", numeroParticipacoes=" + getNumeroParticipacoes() +
            "}";
    }
}
