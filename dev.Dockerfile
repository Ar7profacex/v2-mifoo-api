FROM node:18-alpine

ARG GITHUB_TOKEN_CUSTOM
ENV GITHUB_TOKEN_CUSTOM=${GITHUB_TOKEN_CUSTOM}

# Ejemplo de uso durante el build (opcional)
RUN echo "Token recibido: ${GITHUB_TOKEN_CUSTOM}"

WORKDIR /usr/src/app

COPY package.json ./
COPY .npmrc ./
 
RUN npm install

COPY . .