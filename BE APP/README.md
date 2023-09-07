# Angular Node Project

This is a sample project that demonstrates the integration of Angular frontend with Node.js backend.

## Features

- Angular frontend with CRUD operations for products and categories
- Node.js backend with API endpoints for products and categories
- Sequelize ORM for database operations
- MySQL database

## Prerequisites

- Node.js (version 16+)
- Angular CLI (version 15)
- MySQL database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/akshaychaudhari1994/trootech_code.git
## Install dependencies for the frontend:
cd clientApp/ecom
npm install --legacy-peer-deps 

## Install dependencies for the backend:
npm install

Set up the MySQL database:
create `ecom` db

## Create a new database named angular_node_db
Update the database connection details in config/config.js

## Run the migrations to create the necessary tables

cd backend
npx sequelize-cli db:migrate

## Start the server:
npm start
