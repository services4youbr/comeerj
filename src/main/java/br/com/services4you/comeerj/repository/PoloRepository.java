package br.com.services4you.comeerj.repository;

import br.com.services4you.comeerj.domain.Polo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Polo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PoloRepository extends JpaRepository<Polo, Long> {

}
