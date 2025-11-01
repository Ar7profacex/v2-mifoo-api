# Imagen productiva
FROM node:18-alpine AS production
LABEL org.opencontainers.image.authors="ar7pro.desarrollo@gmail.com"
WORKDIR /app
# Copia de directorio dist previamente generado como artefacto en gitlab
COPY ./node_modules/ ./node_modules
COPY ["package.json", "./"]
COPY ./dist/ ./dist
COPY ./start-ms.sh .
COPY ./dist/update-migrations.js ./
COPY ./dist/ormconfig.js ./
CMD ["/bin/sh","start-ms.sh"]