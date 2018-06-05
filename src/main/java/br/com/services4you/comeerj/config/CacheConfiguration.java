package br.com.services4you.comeerj.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(br.com.services4you.comeerj.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Usuario.class.getName() + ".inscricoes", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Evento.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Evento.class.getName() + ".inscricoes", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Inscricao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Comissao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Comissao.class.getName() + ".inscricoes", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Polo.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Polo.class.getName() + ".inscricoes", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.FaixaEtaria.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.FaixaEtaria.class.getName() + ".turmas", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Turma.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Turma.class.getName() + ".inscritos", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Turma.class.getName() + ".evangelizadores", jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Alojamento.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.services4you.comeerj.domain.Alojamento.class.getName() + ".inscritos", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
