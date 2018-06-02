package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Inscricao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Inscricao entity.
 */
public interface InscricaoSearchRepository extends ElasticsearchRepository<Inscricao, Long> {
}
