import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "src/common/common.module";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { DailyController } from "./daily/daily.controller";
import { DailyService } from "./daily/daily.service";
import { PosModule } from "src/pos/pos.module";
import { ConsolidateController } from "./consolidate/consolidate.controller";
import { ConsolidateService } from "./consolidate/consolidate.service";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    HttpModule,
    AuthModule,
    PosModule
  ],
  controllers: [DailyController, ConsolidateController],
  providers: [DailyService, ConsolidateService],
})
export class ReportModule { }
