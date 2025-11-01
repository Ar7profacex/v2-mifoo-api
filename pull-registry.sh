#!/bin/bash

# Variables
REGISTRY_HOST="registry.ar7pro.com"
DOCKER_IMAGE_NAME="ar7pro-mifoo-v2-api-image"
DOCKER_CONTAINER_NAME="ar7pro-mifoo-v2-api-container"
DOCKER_IMAGE_TAG="latest"
DOCKER_REPO="$REGISTRY_HOST/$DOCKER_IMAGE_NAME"

echo "🔐 Docker login..."
echo "$REGISTRY_PASS" | docker login "$REGISTRY_HOST" -u "$REGISTRY_USER" --password-stdin || { echo "❌ Error al iniciar sesión en $REGISTRY_HOST"; exit 1; }

echo "📥 Docker pull..."
docker pull --platform linux/amd64 "$DOCKER_REPO:$DOCKER_IMAGE_TAG" || { echo "❌ Error al hacer pull de la imagen"; exit 1; }

echo "🗑️ Eliminando container existente..."
docker rm -f "$DOCKER_CONTAINER_NAME" 2>/dev/null || echo "ℹ️ No había container corriendo"

echo "🐳 Docker run..."
docker run -d --env-file .env --restart=always --name "$DOCKER_CONTAINER_NAME" -p 8002:80 "$DOCKER_REPO:$DOCKER_IMAGE_TAG"

echo "✅ ¡Container corriendo exitosamente en $DOCKER_CONTAINER_NAME desde $REGISTRY_HOST!"
