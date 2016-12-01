# docker build -f postgres.dockerfile --tag monsteruk/has-postgres ../
# docker run -p 5432:5432 --name has-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=has -d monsteruk/has-postgres

FROM postgres:latest

MAINTAINER Roy Bailey

# RUN ["mkdir", "/docker-entrypoint-initdb.d"]
COPY      ./.docker/scripts/postgresinit.sql /docker-entrypoint-initdb.d/

EXPOSE 5432