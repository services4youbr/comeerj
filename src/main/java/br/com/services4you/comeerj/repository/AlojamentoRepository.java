package br.com.services4you.comeerj.repository;

import br.com.services4you.comeerj.domain.Alojamento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Alojamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlojamentoRepository extends JpaRepository<Alojamento, Long> {

}
