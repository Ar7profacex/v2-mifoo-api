## Requerimientos

- NODE > 18.x
- NestJS 9

## Documentacion NestJS

[Nest](https://docs.nestjs.com/) framework TypeScript.

## Documentacion Api

Documentacion api definida con [Swagger](http://localhost:8001/v2/mifoo-api/docs).

```bash
http://localhost:[APP_PORT]/v[API_VERSION]/[APP_PREFIX]/docs
```

## Environment

Configurar las variables de entorno en `.bashrc`

```
export GITHUB_ACTOR_CUSTOM=USER_GITHUB
export GITHUB_TOKEN_CUSTOM=TOKEN_GITHUB_CLASSIC
```

## Docker dev

Para levantar proyecto en docker dev executa `docker compose -f docker-dev.yml up --build -d`
