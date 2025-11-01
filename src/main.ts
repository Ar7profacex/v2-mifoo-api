import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionsFilter } from "./common/filters/http-exceptions.filter";
import { json } from "express";
import { swaggerOptions } from "./swagger/swagger.options";
import { SwaggerModule } from "@nestjs/swagger";
import { createDocument } from "./swagger/swagger";
import { APP_PREFIX } from "./common/utils/constants";
import * as expressBasicAuth from 'express-basic-auth'
import { SWAGGER_PASS, SWAGGER_USER } from "./swagger/swagger.config";
import * as cookieParser from "cookie-parser";
import { DatabaseExceptionFilter } from "./common/filters/database-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const port = configService.get("APP_PORT");
    const version = configService.get("API_VERSION");
    const env = configService.get("ENV");
    const prefix = APP_PREFIX;
    const url = `v${version}/${prefix}`;
    const httpAdapterHost = app.get(HttpAdapterHost);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );
    app.useGlobalFilters(new HttpExceptionsFilter(httpAdapterHost));
    app.useGlobalFilters(new DatabaseExceptionFilter());
    app.setGlobalPrefix(`v${version}/acreditacion-${prefix}`);
    app.use(json({ limit: "100mb" }));
    app.use(cookieParser());
    app.enableCors();

    //SWAGGER SETUP
    if (env !== 'prod') {//PROD QUITAR DOCUMENTACION
        const swaggerPath = `v${version}/${prefix}/docs`;
        app.use(`/${swaggerPath}`, expressBasicAuth({
            challenge: true,
            users: { [SWAGGER_USER]: SWAGGER_PASS },
        }))

        SwaggerModule.setup(
            swaggerPath,
            app,
            createDocument(app),
            swaggerOptions
        );
    }
    //SWAGGER SETUP

    await app.listen(port);
    console.log(`Servicio corriendo en ${url} \nDocumentacion: ${url}/docs`);
}

bootstrap();
