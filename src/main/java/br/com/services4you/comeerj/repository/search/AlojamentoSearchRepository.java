package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Alojamento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Alojamento entity.
 */
public interface AlojamentoSearchRepository extends ElasticsearchRepository<Alojamento, Long> {
}
