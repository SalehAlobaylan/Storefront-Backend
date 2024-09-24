# Storefront Backend Project
## To access the database in (port 5433) through docker in these steps:
    docker compose up
    psql -h 127.0.0.1 -p 5433 -U postgres
    pass: 927319
Then creating user inside postgres

    create user saleh with password '927319';
    ALTER ROLE saleh WITH Superuser;

Now signout then sign in with the new user

        psql -h 127.0.0.1 -p 5433 -U saleh postgres
        pass: 927319
        create database store;
        
* Now You can run the code with the next step:
### To run the project use this script(port 3000):
    npm run server

### To run the unit tests use this script:
    npm run test

### To run the prettier for code quality use this script:
    npm run pret

### To run the EsLint for code Quality use this script:
    npm run lint