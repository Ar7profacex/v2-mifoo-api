import { SWAGGER_CONFIG, X_API_KEY, X_CROSS_PLATFORM } from "@ar7profacex/shared";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .addBearerAuth()
    .addApiKey({ type: "apiKey", name: X_API_KEY, in: "header" }, X_API_KEY)
    .addApiKey({
      type: "apiKey",
      name: X_CROSS_PLATFORM,
      in: "header",
      description: "Cross platform identifier (required for multi-tenant operations)"
    }, X_CROSS_PLATFORM)
    .setVersion(SWAGGER_CONFIG.version);

  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }
  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
}
