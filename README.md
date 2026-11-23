# API Digital College

## Sobre o projeto

Este projeto foi desenvolvido como atividade prática do curso Digital College.

A API tem como objetivo gerenciar usuários, categorias e produtos, permitindo operações de cadastro, consulta, atualização e exclusão de dados.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- JWT para autenticação
- Swagger para documentação da API

## Funcionalidades

- Cadastro e gerenciamento de usuários.
- Autenticação de usuários.
- Cadastro e gerenciamento de categorias.
- Cadastro e gerenciamento de produtos.
- Associação de produtos com categorias.
- Cadastro de imagens e opções dos produtos.
- Proteção de rotas por autenticação.
- Documentação da API com Swagger.

## Banco de dados

O projeto utiliza MySQL com o banco de dados `digitalcollege_db`.

É necessário ter o MySQL instalado e configurar as variáveis de ambiente no arquivo `.env`.

**Importante:** não compartilhar o arquivo `.env`, pois ele contém informações de acesso ao banco de dados e outros dados privados.

## Como executar o projeto

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no terminal.
3. Instale as dependências:

```bash
npm install
```

4. Configure o arquivo `.env` com os dados de conexão do MySQL e as demais variáveis exigidas pelo projeto.
5. Inicie a aplicação:

```bash
npm run dev
```

## Documentação da API

Com o servidor em execução, acesse:

http://localhost:3000/api-docs

A documentação permite consultar os endpoints e testar as funcionalidades da API.

## Repositório

https://github.com/samarareis/projetoback-end

## Projeto acadêmico

Desenvolvido para a atividade de Backend da Digital College.
