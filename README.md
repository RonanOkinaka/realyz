# realyz

Pronounced 'realize', the goal of this project is to connect people to people. Recruiting can be more than algorithms screening text files, and we hope to make it so.

Based on Node.js, Express and React.

## Running the Backend

#### Prerequisites
- The backend uses Node.js, so install it [with their instructions](https://nodejs.org/en/download/package-manager/)
- For the server layer, this project uses [MariaDB](https://mariadb.com/downloads/)
- This repository (`git clone https://github.com/RonanOkinaka/realyz`)

#### Setting up the database
First, log into MariaDB as the root user. For many platforms, the command is something like: `mysql -u root -p`.

We now want to create the database. Use the following command: `CREATE DATABASE realyz;`.
Note that the database does not strictly need to have this name, but the rest of the tutorial may be easier to follow if it matches.

Then, we want to create a user for the backend to use when communicating with MySQL.
Use `CREATE USER 'realyz_agent'@'localhost' IDENTIFIED BY 'choose a password';`.
Once again, the username can be different as long as it is remembered.

Follow this with: `GRANT ALL PRIVILEGES ON realyz.* TO 'realyz_agent'@'localhost';`.

Finally, `FLUSH PRIVILEGES;` and `exit`.

To finish database setup, clone the existing schema with `mysql realyz -u root -p <realyz.sql`.
As of writing, this file is not committed. Please contact me (Ronan) if you need it.

#### Setting up the environment file
In `realyz/backend`, there is a provided template called `env.template`.

Start by creating the `.env` file with `cp env.template .env`.

This is designed to be fill in the blank. Remember to put "quotes around strings!"

Matching the database setup above, fill in the following values:
- `MYSQL_DB_HOST="localhost"`
- `MYSQL_DB_USER="realyz_agent"` (or whatever username was chosen)
- `MYSQL_DB_PASS="the password you chose"`
- `MYSQL_DB_NAME="realyz"`

One can choose any value for:
- `PORT` (numeric, 8080 and 3000 are common)
- `PEPPER` (should be a randomized string)
- `JWT_SECRET` (should be random and long)

#### Preparing Node.js
With Node.js deterministic install, relevant packages can be easily retrieved with `npm install`.

#### Executing
At this point, the backend should be ready. Simply start the server with `npm start`!
