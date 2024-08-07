# UCSA-API

User Champion Stat Aggregator API

# Start command

`npm install`
`npm run dev`

# Patterns

The API is currently utilizing the follow patterns:

- Repository
- DAO

## Repository Pattern

The Repository Pattern will give us the abstraction and separation of logic beween the business logic and data access logic.

## DAO Pattern

The DAO Pattern will give us the abstration we need to separate how we access the database with Knex.

## Dependency Injection pattern

Dependency Injection is used to separate the creation of dependencies from the business logic and gives looser coupling. This also allows for easier unit tests.
