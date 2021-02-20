# CBR Manager #

The CBR (Community Based Rehabilitation) Manager application was created to help facilitating rehabilitation work in communities in the refugee settlements in BidiBidi and Paloryina, Northern Uganda to increase the impact of the work done by HHA (Hope Health Action). There are two / three main types of users. There are admins who oversee the entire process and workers who directly interact with the clients. Workers are responsible for adding clients to the database and filling in visit forms for them.  As of right now, this is only a web application, but a mobile application is desired at a later phase. Despite this, this web application will typically be accessed on mobile devices by workers and desktop by admins. Furthermore, there is ideally going to also be a feature to generate measurable data by the admins. This web application uses React as the frontend with NodeJS as the backend and PostgreSQL as the database. The sequelizer library was used so that writing queries was not necessary.

## Directory Structure ##

The root directory contains the files and directories for a NodeJS backend server with the “client” directory housing our frontend React application. Aside from the client directory, there are a few backend directories / files to take note of:

-	app.js: The starter NodeJS file 
-	migrations: These are the migration files created by the sequelizer NodeJS library. They are to be ran to create all the necessary tables within a PostgreSQL database to house the data for the application and can also be ran with additional parameters to delete all the tables
-	models: The models for the various data objects that are used by the application
-	routes: This contains the files responsible for the backend API that accesses the database upon request. This is intended for the frontend to send HTTP requests to retrieve / add / edit / delete data objects.
-	seeders: Used to load some stock data into the web application for testing / demo purposes

Within the client directory, there are two directories and the package.json file for all dependencies used in the backend. Within the src files:

-	app.js: The starting file for the React application
-	routes.js: Contains the various routes in our web application and the component they’re responsible for loading up. Note that the routes are organized as an array of JSON objects
-	components: Functional components that can be reused for various pages
-	css: the css files used by some of the pages
-	pages: The functional components that are rendered for certain routes and all the components are functional components.

## Build Directions / Dependencies / Run instructions ##

### Installing Dependencies ###

Run in project root directory:
1) "npm install" for backend dependencies
2) "npm install --prefix client" for client dependencies

### Setting up the Database ###

1) Download Postgres server from : https://www.postgresql.org/download/

2) Connect to the server and create an empty database using the terminal or any GUI tool (TablePlus is a good option for Mac users).

3) Inside the project root directory create a ".env" file to setup your environment variables, the ".env" file should include:
    - DB_USERNAME = "your_postgres_username"
    - DB_PASSWORD = your_postgres_password (set it to null if doesn't exist)
    - DB_HOST = "localhost"
    - DB_DATABASE = "database_name"
    - DB_PORT = your_postgres_port (by default it is 5432)
    - DB_URL = "username:password@host_name:port/db_name" (in the same format) 

4) Run "node app.js" to start the server, if you get a "DB connection established successfully" message then you have successfully connected to your database, otherwise an error message will be shown in the console.

5) Run "npx sequelize-cli db:migrate" to let Sequelize create the database tables for you.

6) (Optional) Run "npx sequelize-cli db:seed:all" to load the tables with the provided stock data.

### Run Instructions ###

After all the set up is done, use the command "npm run start" in the project root directory and the client and server will start simultaneously.
