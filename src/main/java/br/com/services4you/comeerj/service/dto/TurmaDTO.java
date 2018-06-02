package br.com.services4you.comeerj.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Turma entity.
 */
public class TurmaDTO implements Serializable {

    private Long id;

    private String nome;

    private Long faixaEtariaId;

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

    public Long getFaixaEtariaId() {
        return faixaEtariaId;
    }

    public void setFaixaEtariaId(Long faixaEtariaId) {
        this.faixaEtariaId = faixaEtariaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TurmaDTO turmaDTO = (TurmaDTO) o;
        if(turmaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turmaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TurmaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
