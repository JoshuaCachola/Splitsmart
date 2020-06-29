FROM node:8.15-alpine as build-stage

# Add all our files install and start
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx:1.15
EXPOSE 80
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
