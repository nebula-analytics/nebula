FROM node:8 AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install
RUN npm install react-scripts -g --silent

COPY . .
RUN npm run build

FROM nginx:latest

RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
