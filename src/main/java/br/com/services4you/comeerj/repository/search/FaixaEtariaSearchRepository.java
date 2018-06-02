package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.FaixaEtaria;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FaixaEtaria entity.
 */
public interface FaixaEtariaSearchRepository extends ElasticsearchRepository<FaixaEtaria, Long> {
}
