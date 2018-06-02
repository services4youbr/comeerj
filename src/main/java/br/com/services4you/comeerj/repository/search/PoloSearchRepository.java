package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Polo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Polo entity.
 */
public interface PoloSearchRepository extends ElasticsearchRepository<Polo, Long> {
}
