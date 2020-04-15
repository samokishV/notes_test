# Notes Api

## Installation

Create config from example and adjust it.

```
# cp .env.example .env
```
Install packages and global install knex.

```
# npm install
# npm install knex -g
```

Run migrations and seeds.

```
# knex migrate:latest --knexfile ./knexfile.ts
# knex seed:run --knexfile ./knexfile.ts
```

Run application.
```
# `npm start`
```
