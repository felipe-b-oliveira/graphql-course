# Modern GraphQL Course
> Study repository of course 'The Modern GraphQL Bootcamp by Andrew Mead'

<h4 align="center"> 🚧  🚀 Under development...  🚧 </h4>

## Tabela de conteúdos
=================
<!--ts-->
   * [Technologies](#technologies)
   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
      * [Folder "graphql-basics"](#folder-graphql-basics)
      * [Folder "graphql-prisma"](#folder-graphql-prisma)
<!--te-->

## Technologies

* [GraphQL](https://graphql.org/)
* [PrismaORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Heroku](https://www.heroku.com/)
* [NodeJS](https://nodejs.org/en/)

## Prerequisites
 You will need to have the following tools installed on your machine:
  * [Git](https://git-scm.com)
  * [Node.js](https://nodejs.org/)
  * [Docker](https://docs.docker.com/engine/install/)
  * [Docker-Compose](https://docs.docker.com/compose/install/)

## Installation
 - Clone the repository ```git clone https://github.com/felipe-b-oliveira/graphql-course.git```

#### Folder "graphql-basics"
 1. Run the command ```npm install```
 2. Inside the project folder run the command ```npm run start``` to start an new instance of GraphQL Playground.
 3. Run the queries and mutations accordinh with the docs **docs** on the right side of the GraphQL Playground.

#### Folder "graphql-prisma"
 1. Run the command ```npm install```
 2. Run the command ```npm install -g prisma@1.12.0```
 3. Navigate to the prisma folder and run the command ```docker-compose up -d```
    * For Linux users run ```sudo docker-compose up -d```
 4. Run teh command ```prisma deploy``` inside the _prisma_ or _prisma-book-review_ folder according with the project.
    * Acess ```localhost:4466/default/default``` for the 'prisma' folder playground.
    * Acess ```http://localhost:4466/books/default``` for the 'prisma-book-review' folder playground.

