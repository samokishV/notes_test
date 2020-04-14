# Catalog API

## Installation

Create config from example and adjust it.

```
# cp .env.example .env
```
Global install knex.

```
# npm install knex -g
```

Run migrations and seeds.

```
# knex migrate:latest --knexfile ./knexfile.ts
# knex seed:run --knexfile ./knexfile.ts
```

## Running tests

Run migrations and tests.

```
# knex migrate:latest --knexfile ./config/knexfile-test.js
# npm test
```
