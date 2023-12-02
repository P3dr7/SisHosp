# Projeto Hospital

## Como Usar ?
Primeiro instala os programas, no caso o **node**, **MySql** e **Redis**, depois as dependências do projeto, essa parte e bem simples, basta abrir o terminal dentro do seu editor de código, no meu caso o **VScode**, e digitar "npm install", para usar o MySql eu recomendo o **XAMP**, depois que o xamp ou outro aplicativo para rodar o MySql local estiver baixado, inicie o serviço MySql, crie um database chamada "app_saude", execute os comandos que esta na pasta **DB**, como o nome de "Criacao Tabela.sql", faca modificações no código caso o seu banco de dados esteja configurado diferente, para modificar e so ir no arquivo "src/db/db.js", apos isso e so ir no terminal do seu editor de código e digitar o comando **npm run dev**, para rodar a API, depois para começar voce abre a pagina src/pages/cadastra.html, apos isso o sistema ja esta pronto para ser usado

## Tecnologias Usadas
Para esse projeto foi feito a parte de front-end, em sua maioria, com HTML e CSS e BOOTSTRAP, as rotas de APIs foram feitas usando fastify, o BackEnd todo feito usando Node.Js, banco de dados local usando a modelagem MariaDB, para comunicação com o banco de dados foi usado a biblioteca MySql2, para o armazenamento em cache local foi usado o Redis, Verificações de login foram feitas usando Tokens JWT, parte de criptografia de dados foi feito usando Bcrypt

## Funcionalidades
- Cadastro
- Login
- Verificações
- Inserção no Banco de Dados
- Atualizações de Prontuários
- DELETE de Prontuários
- Controles de Pacientes
- Controle de Remédios
- Automatizações

## Separações
O código esta divido em pastas, onde a parte de config fica todas as funções mais chamadas, como verificações como por exemplo se um funcionário com id 1111 e um medico, se existe um remédio com tal nome, a geração de ID usando UUID e a verificação de login desincriptografando as senhas usando Bcrypt, depois os controllers, onde e separado por funcionalidades, a parte de banco de dados, onde fica toda a parte de inserção no banco de dados, logo abaixo as paginas da aplicação 

### Explicação  
Voce se cadastra com seu email e senha, depois se cadastra como funcionário,apos isso tem 3 opções, sendo elas **Medicos, Enfermeiros e Farmaceuticos**, onde Medicos faz receitas e altera prontuários, farmacêuticos cuida dos remédios, e enfermeiro cadastra os pacientes e os prontuários
