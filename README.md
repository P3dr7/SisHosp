# Projeto Hospital

## Funcionalidades
- Cadastro
- Login
- Verificações
- Inserção no Banco de Dados

## Separações
O código esta divido em pastas, onde a parte de config fica todas as funções mais chamadas, como verificações como por exemplo se um funcionário com id 1111 e um medico, se existe um remédio com tal nome, a geração de ID usando UUID e a verificação de login desincriptografando as senhas usando Bcrypt, depois os controllers, onde e separado por funcionalidades, a parte de banco de dados, onde fica toda a parte de inserção no banco de dados, logo abaixo as paginas da aplicação 

### Explicação  
Voce se cadastra com seu email e senha, depois faz o login, tem 3 opções, sendo elas **Medicos, Enfermeiros e Farmaceuticos**, onde Medicos faz receitas e altera prontuários, farmacêuticos cuida dos remédios, e enfermeiro cadastra os pacientes e os prontuários

#### O que falta?
As telas de cada um com suas respectivas funcoes
