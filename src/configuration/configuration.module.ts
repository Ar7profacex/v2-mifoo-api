import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "src/common/common.module";
import { AuthModule } from "src/auth/auth.module";
import { PrintersService } from "./printers/printers.service";
import { PrintersController } from "./printers/printers.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PosPrinter } from "src/common/entities/pos-printer.entity";
import { PosPrintQueue } from "src/common/entities/pos-print-queue.entity";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    HttpModule,
    AuthModule,
    TypeOrmModule.forFeature([PosPrinter, PosPrintQueue]),
  ],
  controllers: [PrintersController],
  providers: [PrintersService],
})
export class ConfigurationModule { }
