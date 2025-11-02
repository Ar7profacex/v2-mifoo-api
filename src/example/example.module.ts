import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "src/common/common.module";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { Example1Controller } from "./example1/example1.controller";
import { Example1Service } from "./example1/example1.service";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    HttpModule,
    AuthModule,
  ],
  controllers: [Example1Controller],
  providers: [Example1Service],
})
export class ExampleModule { }
