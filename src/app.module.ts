import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
dotenv.config();
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "./common/common.module";
import ormconfig from "../ormconfig";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { APP_PREFIX } from "./common/utils/constants";

const optionsORm = {
  ...ormconfig,
  entities: [__dirname + "/**/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(optionsORm),
    CommonModule,
    HttpModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
      exclude: [`v${process.env.API_VERSION}/${APP_PREFIX}`],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
