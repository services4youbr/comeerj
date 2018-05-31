# Sistema da COMEERJ (Confraternização de Mocidades Espíritas do Estado do Rio de Janeiro)

## Conteúdo
1 - [Versionamento](#versionamento)
2 - [Contribuição](#contribuicao)
3 - [Histórico](#historico)
4 - [Licença](#licenca)
5 - [Termo de Abertura do Projeto](#termo-de-abertura-do-projeto)


## Vesionamento

Para uma melhor organização dos releases, nós seguimos os guidelines da [Semantic Versioning 2.0.0](http://semver.org/)

## Contribuição

Localize nas [nossas tarefas](https://github.com/services4youbr/comeerj/issues) os nossos próximos passos no projeto
<br>
Quer contribuir? Siga [nossas recomendações](https://github.com/services4youbr/comeerj/blob/master/CONTRIBUTING.md)

[![Throughput Graph](https://graphs.waffle.io/services4youbr/comeerj/throughput.svg)](https://waffle.io/services4youbr/comeerj/metrics/throughput)

## Histórico

Veja os [releases](https://github.com/services4youbr/comeerj/releases) para detalhamento das modificações

## Licença

[MIT License](https://github.com/services4youbr/comeerj/blob/master/LICENSE)

# Termo de abertura do projeto

**Projeto**: COMEERJ
**Unidade demandante**: Desenvolvimento
**Gestor do Projeto**: Rodrigo Dias de Freitas
**Demandante**: Floriano Peixoto

## Justificativa
A COMEERJ é um evento anual que acontece em diversos locais no estado do Rio de Janeiro mas que é gerenciada em vários momentos do ano, visando sempre o evento. Por não haver ferramentas no mercado que faça um gerenciamento eficaz para coordenação, existe essa necessidade de desenvolvimento de uma ferramenta para o gerenciamento total do evento. Hoje já existe um sistema que está defasado e que não atende as necessidades da coordenação.

## Objetivo do projeto
Os objetivos desse projeto são:

  - Criar uma ferramenta de gestão do evento
  - Aprimorar o sistema que já existe

## Alinhamento estratégico
De acordo com as estratégias da empresa, esse projeto visa:

  - Aprendizado
  - Gestão de projetos
  - Novas tecnologias

## Responsabilidades e partes interessadas
Todos os 4 sócios, Floriano Peixoto, Hugo Batista, Luiz Aureliano e Rodrigo Freitas participarão desse projeto, onde:

Floriano será responsável por disponibilizar informações necessárias sobre o projeto, arquitetura e desenvolvimento backend.
Hugo acompanhará todo o projeto e irá gerar um contrato de sistema/aplicativo.
Luiz será responsável pelo desenvolvimento do Backend e auxiliará no gerenciamento do projeto.
Rodrigo será responsável pelo design do sistema, desenvolvimento do Frontend e gerenciamento do projeto.

## Escopo
- 5.1 - Login
    - 5.1.1 - Login via formulário
    - 5.1.2 - Login via redes sociais
- 5.2 - Cadastro
    - 5.2.1 - Cadastro de dados básicos
    - 5.2.2 - Manutenção de permissão via perfil
    - 5.2.3 - Envio de email com informações após cadastro
    - 5.2.4 - Esqueci senha
    - 5.2.5 - Alterar senha
- 5.3 - Manutenção de evento
    - 5.3.1 - CRUD Evento
    - 5.3.2 - Envio de email informando que novo evento foi criado com as datas
    - 5.3.3 - Envio de email para todos os inscritos nos eventos.
    - 5.3.4 - Envio de mensagem em rede social para quem vinculou conta com as mesmas informações
- 5.4 - Inscrição
    - 5.4.1 - Inscrever-se em um evento durante o período de inscrições
    - 5.4.2 - Permitir que coordenadores possam alterar as inscrições ou realizar novas após o período de inscrições
    - 5.4.3 - Permitir alteração de inscrições
    - 5.4.4 - Enviar email para os coordenadores do polo ou de comissões  quando alguem se inscrever
- 5.5 - Relatórios
    - 5.5.1 - Relatórios com diversas informações disponíveis para todos os coordenadores
- 5.6 - Turmas de evangelização
    - 5.6.1 - Manutenção de turmas e vinculação de jovens e trabalhadores nas turmas
- 5.7 - Alojamentos
    - 5.7.1 - Manutenção de alojamentos
- 5.8 - Presença e pagamentos
    - 5.8.1 - Módulo que facilita informar presença e pagamento
    - 5.8.2 - Possivelmente usar qr code para presença
- 5.9 - Dashboard
- 5.10 - Calendário

## Premissas
- Inscrição no evento tem que enviar por e-mail ou disponibilizar um link para download da ficha
- Conseguir substituir o que o Floriano já tem para gestão do evento
- Conseguir disponibilizar as informações para os gestores

## Restrições
- Não temos budget
- Não temos Cloud

## Riscos iniciais
- Não conhecimento total das tecnologias que utilizaremos
- Junção das tecnologias de Frontend e Backend sem um histórico delas juntas em um projeto.
