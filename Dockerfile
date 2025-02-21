
FROM node:22.11.0-slim@sha256:f035ba7ffee18f67200e2eb8018e0f13c954ec16338f264940f701997e3c12da AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --no-fund --no-audit

COPY . .

RUN npm run build

FROM nginx:1.27.4-alpine@sha256:4ff102c5d78d254a6f0da062b3cf39eaf07f01eec0927fd21e219d0af8bc0591

COPY --from=builder /app/dist /usr/share/nginx/html

COPY docker/nginx/snippets/proxy-params.conf /etc/nginx/snippets/proxy-params.conf
# each time nginx is started it will perform variable substition in all template
# files found in `/etc/nginx/templates/*.template`, and copy the results (without
# the `.template` suffix) into `/etc/nginx/conf.d/`.
COPY docker/nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
