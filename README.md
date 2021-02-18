## Steps to run the server for the first time:

1) Download any local [PostgreSQL server](https://www.postgresql.org/download/)

2) Connect to the server and create an empty database using the terminal or any GUI tool (TablePlus is a good option for Mac users)

3) Inside the project root directory, create a `.env` file to setup your environment variables. Add the following to your `.env` file:
```
DB_USERNAME = "your_postgres_username"
DB_PASSWORD = your_postgres_password (set it to null if doesn't exist)
DB_HOST = "localhost"
DB_DATABASE = "database_name"
DB_PORT = your_postgres_port (by default it is 5432)
DB_URL = "username:password@localhost:port/db_name" (in the same format)
```

4) Run `node app.js` to start the server
    - if you get a "DB connection established successfully" message then you have successfully connected to your database
    - otherwise an error message will be shown in the console

5) Run `npx sequelize-cli db:migrate` to let Sequelize create the database tables for you

6) Start the server again... now you can start sending requests via [Postman](https://www.postman.com/)