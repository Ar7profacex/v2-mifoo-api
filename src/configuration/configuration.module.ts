import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "src/common/common.module";
import { AuthModule } from "src/auth/auth.module";
import { PrintersService } from "./printers/printers.service";
import { PrintersController } from "./printers/printers.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    HttpModule,
    AuthModule,
  ],
  controllers: [PrintersController],
  providers: [PrintersService],
})
export class ConfigurationModule { }
