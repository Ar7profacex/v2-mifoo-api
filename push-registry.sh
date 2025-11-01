#!/bin/bash

# Variables
REGISTRY_HOST="registry.ar7pro.com"
DOCKER_IMAGE_NAME="ar7pro-api-mifoo-v2-image"
DOCKER_IMAGE_TAG="latest"
DOCKER_REPO="$REGISTRY_HOST/$DOCKER_IMAGE_NAME"

REGISTRY_USER="$REGISTRY_USER"
REGISTRY_PASS="$REGISTRY_PASS"

echo "Eliminando docker imagen local"
docker rmi -f "$DOCKER_REPO:$DOCKER_IMAGE_TAG" 2>/dev/null || true

echo "Build Nest"
npm install && npm run build 

# (Opcional) login si configuraste basic auth en tu registry
echo "Iniciando sesión en Registry Privado..."

# Configurar Docker para no usar credential store
mkdir -p ~/.docker
echo '{"credsStore": ""}' > ~/.docker/config.json

echo "$REGISTRY_PASS" | docker login "$REGISTRY_HOST" -u "$REGISTRY_USER" --password-stdin || { echo "Error al iniciar sesión"; exit 1; }

# Docker build
echo "Docker build prod..."
docker buildx rm mybuilder
docker buildx create --name mybuilder --use --driver docker-container
docker buildx build --no-cache --platform linux/amd64,linux/arm64 \
  -t "$DOCKER_REPO:$DOCKER_IMAGE_TAG" \
  -f prod.Dockerfile . --push || { echo "❌ Error al construir/subir la imagen"; exit 1; }

echo "✅ ¡Imagen multi-arch subida exitosamente a $DOCKER_REPO:$DOCKER_IMAGE_TAG!"
