package br.com.services4you.comeerj.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the FaixaEtaria entity.
 */
public class FaixaEtariaDTO implements Serializable {

    private Long id;

    private String nome;

    private Long idadeMin;

    private Long idadeMaxima;

    private String descricao;

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

    public Long getIdadeMin() {
        return idadeMin;
    }

    public void setIdadeMin(Long idadeMin) {
        this.idadeMin = idadeMin;
    }

    public Long getIdadeMaxima() {
        return idadeMaxima;
    }

    public void setIdadeMaxima(Long idadeMaxima) {
        this.idadeMaxima = idadeMaxima;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FaixaEtariaDTO faixaEtariaDTO = (FaixaEtariaDTO) o;
        if(faixaEtariaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), faixaEtariaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FaixaEtariaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", idadeMin=" + getIdadeMin() +
            ", idadeMaxima=" + getIdadeMaxima() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
