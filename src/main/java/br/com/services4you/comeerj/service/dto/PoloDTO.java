package br.com.services4you.comeerj.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Polo entity.
 */
public class PoloDTO implements Serializable {

    private Long id;

    private String nome;

    private String numero;

    private String reunir;

    private String localizacao;

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

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getReunir() {
        return reunir;
    }

    public void setReunir(String reunir) {
        this.reunir = reunir;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PoloDTO poloDTO = (PoloDTO) o;
        if(poloDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), poloDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PoloDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", numero='" + getNumero() + "'" +
            ", reunir='" + getReunir() + "'" +
            ", localizacao='" + getLocalizacao() + "'" +
            "}";
    }
}
