package br.com.services4you.comeerj.repository;

import br.com.services4you.comeerj.domain.Comissao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Comissao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComissaoRepository extends JpaRepository<Comissao, Long> {

}
