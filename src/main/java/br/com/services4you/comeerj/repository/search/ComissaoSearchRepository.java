package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Comissao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Comissao entity.
 */
public interface ComissaoSearchRepository extends ElasticsearchRepository<Comissao, Long> {
}
