import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "src/common/common.module";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { SalesController } from "./sales/sales.controller";
import { SalesService } from "./sales/sales.service";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    HttpModule,
    AuthModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class PosModule { }
