# Notes Api

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
