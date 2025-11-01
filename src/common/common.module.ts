import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApisUrl } from "./utils/apis-url.util";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";

@Module({
  providers: [
    ApisUrl,
  ],
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([]),
  ],
  exports: [
    ApisUrl,
    TypeOrmModule,
  ],
})
export class CommonModule { }
