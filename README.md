# Log Anomaly Detectory (Cloud)
## Docker Compose files
There are multiple docker compose files that are available.

To develop/test the backend, we recommend using `docker-compose.yaml`. This will deploy the microservices, postgres databaes, and jaeger (all-in-one). It deploys the minimal number of containers in order to run the microservices. 

For a complete deployment that includes kafka and elasticsearch, use the following files in order: `docker-compose.kafka.yaml`,
`docker-compose.jaeger.yaml`, and `docker-compose.app.yaml`. 

To deploy the frontend application locally use `npm install` and `npm start` in the movie-client directory.

Currently the core functionality available to the user includes: logging in, viewing ratings, creating, editing and deleting ratings. To login to the frontend, provide an integer for the user id and any password. (password authentication not implemented)

