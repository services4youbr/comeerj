package br.com.services4you.comeerj.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import br.com.services4you.comeerj.domain.enumeration.Genero;

/**
 * A DTO for the Alojamento entity.
 */
public class AlojamentoDTO implements Serializable {

    private Long id;

    private String nome;

    private String sala;

    private String local;

    private Genero genero;

    private Long responsavelId;

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

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Long getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(Long inscricaoId) {
        this.responsavelId = inscricaoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlojamentoDTO alojamentoDTO = (AlojamentoDTO) o;
        if(alojamentoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alojamentoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlojamentoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sala='" + getSala() + "'" +
            ", local='" + getLocal() + "'" +
            ", genero='" + getGenero() + "'" +
            "}";
    }
}
