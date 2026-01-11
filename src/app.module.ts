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
import { ConfigurationModule } from "./configuration/configuration.module";
import { ExampleModule } from "./example/example.module";
import { PosModule } from "./pos/pos.module";
import { ReportModule } from "./report/report.module";

const optionsORm = {
  ...ormconfig,
  entities: [__dirname + "/**/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(optionsORm),
    CommonModule,
    HttpModule,
    AuthModule,
    ExampleModule,
    ConfigurationModule,
    PosModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
      exclude: [`v${process.env.API_VERSION}/${APP_PREFIX}`],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
