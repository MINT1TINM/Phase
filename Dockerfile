# build environment
FROM node:alpine as build-stage
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
RUN npm install @vue/cli@3.7.0 -g
COPY . .
RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=build-stage /app/dim-step /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/serv.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]