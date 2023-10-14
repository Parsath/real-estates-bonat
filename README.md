# Bonat Real Estates API

This is a RESTful API for managing real estates developed with NestJS.

## Installation

### Clone the repository

```bash
git clone https://github.com/Parsath/real-estates-bonat.git
cd real-estates-bonat
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and configure the following environment variables:

```dotenv
# APP_CONFIG

APP_NAME=Bonat
APP_ENV=dev
APP_URL=http://localhost:3000
APP_PORT=3000

# DB_CONFIG

DB_HOST=localhost
DB_PORT=5432
DB_NAME=real-estates-test
DB_USERNAME=postgres
DB_PASSWORD=bonat
DB_PROD=

# PG_ADMIN

PGADMIN_PORT=5050
PGADMIN_DEFAULT_EMAIL=test@gmail.com
PGADMIN_DEFAULT_PASSWORD=bonat

# SWAGGER_CONFIG

SWAGGER_TITLE=Bonat Real Estates Doc
SWAGGER_DESCRIPTION=Bonat Real Estates Backend documentation
SWAGGER_VERSION=1.0
SWAGGER_TAGS=Bonat
```

## Set up database

### Build the application

```bash
make build
```

### Run the application

```bash
npm run dev
```

## API Documentation

You can access the Swagger API documentation by navigating to the following URL in your web browser:

http://localhost:3000/doc
