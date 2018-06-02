package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Evento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Evento entity.
 */
public interface EventoSearchRepository extends ElasticsearchRepository<Evento, Long> {
}
