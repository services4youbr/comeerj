<h1 id="usuário">Usuário</h1>
<p>Usuário é uma entidade que carrega informações básicas sobre todos os atores envolvidos no sistema.</p>
<h2 id="atributos">Atributos</h2>
<p>Os atributos que um usuário possui são:</p>

<table>
<thead>
<tr>
<th>Atributo</th>
<th>Tipo</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nome</td>
<td>String</td>
</tr>
<tr>
<td>Email</td>
<td>String</td>
</tr>
<tr>
<td>Data de nascimento</td>
<td>LocalDate</td>
</tr>
<tr>
<td>Senha</td>
<td>String criptografada keycloack</td>
</tr>
</tbody>
</table><h2 id="rede-social">Rede social</h2>
<p>Os usuários poderão vincular suas contas de gmail e facebook para facilitar o acesso a informação.</p>
<h2 id="cadastro">Cadastro</h2>
<p>O cadastro pede essa informações básicas e pode ser feito  vinculando sua conta de redes sociais.</p>
<h2 id="alterar-senha">Alterar senha</h2>
<p>O sistema permite alterar senha, o formulário deve conter a nova antiga e duas confirmações da senha nova.</p>
<h2 id="esqueci-senha">Esqueci senha</h2>
<p>O sistema envia uma senha provisória para o usuário.</p>
<h2 id="dados-para-contato">Dados para contato</h2>
<p>Fica disponibilizado ao usuário um menu para indicar formas de contato.<br>
O usuário pode informar até 3 telefones de contato, cada um de um tipo: celular, casa, trabalho</p>
<h3 id="telefone">Telefone</h3>

<table>
<thead>
<tr>
<th>Atributo</th>
<th>tipo</th>
</tr>
</thead>
<tbody>
<tr>
<td>Numero</td>
<td>String [(__) 9____-____]</td>
</tr>
<tr>
<td>Tipo</td>
<td>CELULAR, CASA, TRABALHO</td>
</tr>
</tbody>
</table><h3 id="dados-de-contato-durante-a-comeerj">Dados de contato durante a comeerj</h3>
<p>Durante o evento pode haver a necessidade de se comunicar com algum conhecido, deve se apresentar pelo ao menos uma opção de contato, apresentando telefone e nome.</p>
<h2 id="responsável">Responsável</h2>
<p>Se o usuário for menor de idade ele deve dar informações acerca do seu responsável</p>
<h3 id="dados-do-responsável">Dados do responsável</h3>

<table>
<thead>
<tr>
<th>Atributo</th>
<th>Tipo</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nome</td>
<td>Texto</td>
</tr>
<tr>
<td>Identidade</td>
<td>Texto</td>
</tr>
</tbody>
</table><h2 id="alimentação">Alimentação</h2>
<p>O sistema deve disponibilizar uma área para informar seu tipo de alimentação:</p>
<ol>
<li>Normal</li>
<li>Vegetariana</li>
<li>Vegana</li>
<li>Com restrição<br>
Caso haja restrição abrir um campo para informar qual.</li>
</ol>
<h2 id="dados-médicos">Dados médicos</h2>
<p>O sistema disponibilizar um campo para informar dados médicos.</p>
<h3 id="plano-de-saúde">Plano de saúde</h3>
<p>Informar se o usuário possui o plano de saúde e qual</p>
<h3 id="medicação-rotineira">Medicação rotineira</h3>
<p>Informar se o usuário faz uso contínuo de medicamentos e quais medicamentos</p>
<h3 id="alergias">Alergias</h3>
<p>Informar alergias que o usuário possui, seria bom o sistema disponibilizar uma lista que o usuário pudesse encontrar sua alergia.</p>
<h2 id="dados-da-instituição-espírita">Dados da instituição espírita</h2>
<p>Aqui se concentram informações básicas da instituição espírita que o usuário frequenta.</p>

<table>
<thead>
<tr>
<th>Atributo</th>
<th>Tipo</th>
</tr>
</thead>
<tbody>
<tr>
<td>nome</td>
<td>texto</td>
</tr>
<tr>
<td>DiaReuniao</td>
<td>DOM,SEG,TER,QUA,QUI,SEX,SAB</td>
</tr>
<tr>
<td>HoraReuniaoMocidade</td>
<td>Hora:Minuto</td>
</tr>
<tr>
<td>Atividades</td>
<td>Lista de atividades com outros</td>
</tr>
<tr>
<td>CEU</td>
<td>Numero</td>
</tr>
</tbody>
</table><blockquote>
<p>Written with <a href="https://stackedit.io/">StackEdit</a>.</p>
</blockquote>

