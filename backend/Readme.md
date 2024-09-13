Prerequisites:
- Docker and docker-compose installed to run database
- if not docker and docker compose installed change enviroment on .env

     - MONGO_DB_NAME=disruptivedb
     - MONGO_DB_HOST=localhost
     - MONGO_DB_PORT=27017
     - MONGO_INITDB_ROOT_USERNAME=disruptive
     - MONGO_INITDB_ROOT_PASSWORD=disruptive 
  
Script: 

    ``npm run dev to serve on development mode``

    ``npm run build build project``

    ``npm run start, start project from build``

    ``npm run db, create database mongo``

   