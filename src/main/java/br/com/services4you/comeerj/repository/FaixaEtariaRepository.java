package br.com.services4you.comeerj.repository;

import br.com.services4you.comeerj.domain.FaixaEtaria;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FaixaEtaria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaixaEtariaRepository extends JpaRepository<FaixaEtaria, Long> {

}
