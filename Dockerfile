FROM node:carbon
# VOLUME [ "/home/www/certs" ]
# FROM node:carbon-alpine
# COPY /etc/letsencrypt/archive/task-scheduler.tk /home/www/certs
VOLUME [ "/home/www/messenger-task-scheduler-bot" ]
WORKDIR /home/www/messenger-task-scheduler-bot/
# COPY . /home/www/
# RUN npm install
EXPOSE 8000

CMD npm install && npm start


