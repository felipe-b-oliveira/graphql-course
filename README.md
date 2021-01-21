# Modern GraphQL Course
> Repositório de estudo do curso The Modern GraphQL Bootcamp

<h4 align="center"> 🚧  🚀 Em andamento...  🚧 </h4>

## Tabela de conteúdos
=================
<!--ts-->
   * [Tecnologias](#tecnologias)
   * [Pré-Requisitos](#pré-requisitos)
   * [Instalação](#instalação)
      * [Pasta "graphql-basics"](#pasta-graphql-basics)
      * [Pasta "graphql-prisma"](#pasta-graphql-prisma)
<!--te-->

## Tecnologias

* [GraphQL](https://graphql.org/)
* [PrismaORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Heroku](https://www.heroku.com/)
* [NodeJS](https://nodejs.org/en/)

## Pré-Requisitos
 Você vai precisar ter instalado em sua máquina as seguintes ferramentas:
  * [Git](https://git-scm.com)
  * [Node.js](https://nodejs.org/)
  * [Docker](https://docs.docker.com/engine/install/)
  * [Docker-Compose](https://docs.docker.com/compose/install/)

## Instalação
 - Efetue o clone do repositório ```git clone https://github.com/felipe-b-oliveira/graphql-course.git```

#### Pasta "graphql-basics"
 1. Execute o comando ```npm install```
 2. Dentro da pasta do projeto execute o comando ```npm run start``` para iniciar uma instância do GraphQL Playground
 3. Execute as querys e as mutations de acordo com a documentação **docs** no canto direito do Playground

#### Pasta "graphql-prisma"
 1. Execute o comando ```npm install```
 2. Execute o comando ```npm install -g prisma@1.12.0```
 3. Navegue até a pasta prisma e execute o comando ```docker-compose up -d```
    * Para Linus execute ```sudo docker-compose up -d```
 4. Execute o comando ```prisma deploy``` dentro da pasta _prisma_ ou _prisma-book-review_ de acordo com o projeto desejado.
    * Acesse ```localhost:4466/default/default``` para o playground do projeto da pasta prisma
    * Acesse ```http://localhost:4466/books/default``` para o playground do projeto da pasta prisma-book-review

