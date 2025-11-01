import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { AuthConfig } from "./auth-config";
import { HttpModule } from "@nestjs/axios";
import { ApisUrl } from "src/common/utils/apis-url.util";

@Module({
  controllers: [],
  providers: [AuthService, AuthConfig, ApisUrl],
  imports: [ConfigModule, HttpModule],
  exports: [AuthService],
})
export class AuthModule {}
