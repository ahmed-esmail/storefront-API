# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


### Database Setup

```sh
# create user
CREATE USER admin WITH PASSWORD 'password123';

# create Database
CREATE DATABASE frontstore; CREATE DATABASE frontstore_test;

# grant all databases to the user
GRANT ALL PRIVILEGES ON DATABASE frontstore TO admin;
GRANT ALL PRIVILEGES ON DATABASE frontstore_test TO admin;
```

### Database Migrations
```sh
db-migrate up
```

### Environmental Variables (.env file contents)
```sh
PORT=3000
ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=frontstore
POSTGRES_DB_TEST=frontstore_test
POSTGRES_USER=YOUR_POSTGRES_USER
POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD 
BCRYPT_PASSWORD =your-secret-password
SALT_ROUND=10
TOKEN_SECRET=your-secret-token
```

## Run Locally

Clone the project

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
