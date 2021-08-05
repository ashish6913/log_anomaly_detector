FROM node:14.17.0-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet -- --only=prod
COPY . ./
RUN npm run build -- --output-path=dist

# FROM nginx:1.21.0-alpine
FROM opentracing/nginx-opentracing:0.18.0
COPY --from=build /app/dist /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /app/nginx-init.sh /app/nginx-jaeger-config.json /home/nginx/
RUN chmod -R +x /home/nginx
RUN cat /etc/nginx/nginx.conf