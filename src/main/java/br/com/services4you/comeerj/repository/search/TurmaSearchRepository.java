package br.com.services4you.comeerj.repository.search;

import br.com.services4you.comeerj.domain.Turma;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Turma entity.
 */
public interface TurmaSearchRepository extends ElasticsearchRepository<Turma, Long> {
}
