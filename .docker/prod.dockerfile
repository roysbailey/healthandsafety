# docker build -f prod.dockerfile --tag monsteruk/has-webapp ../
# docker run -it -p 8080:3000 --env-file env/dev.webapp.env --name has-webapp  monsteruk/has-webapp
# docker run -d -p 8080:3000 --env-file env/dev.webapp.env --name has-webapp  monsteruk/has-webapp

FROM node:latest

MAINTAINER Roy Bailey

ENV PORT=3000

# Copy the current source code into the container - this is then baked in to the container itself for prod.
COPY      . /var/www
WORKDIR   /var/www

RUN       npm install -g pm2@latest
RUN       mkdir -p /var/log/pm2
# not point running npm here, as we dont map the source until we run the container via docker run
#RUN       npm install

EXPOSE $PORT

#ENTRYPOINT ["npm", "start"]
ENTRYPOINT ["pm2", "start", "server.js","--name","has-webapp","--log","/var/log/pm2/pm2.log","--watch","--no-daemon"]

#Note. When running the container, you specify an environemnt file (the app relies on a number of environment variables).  This is the list, add your own values for these.
# NODE_ENV=development 
# PORT=3000
# AzureProcessingQueueConnection=DefaultEndpointsProtocol=https;AccountName={YOUR_STORAGE_ACCOUNT_NAME};AccountKey={YOUR_KEY}
# AWS_ACCESS_KEY_ID={YOUR_AWS_KEY}
# AWS_SECRET_ACCESS_KEY={YOUR_AWS_SECRET_KEY}