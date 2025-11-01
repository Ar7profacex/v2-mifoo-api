import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpExceptionWM } from "../../common/exceptions/http.exception";
import { ExceptionEnum } from "../../common/enum/exception.enum";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthPublicGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private authService: AuthService,
    private configService: ConfigService
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const header = request.headers;
    const authorization = header["x-api-key"];

    if (authorization === undefined) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.FORBIDDEN,
        messageDetail: `La apiKey es requerida`,
      });
    }

    let authorizationString = "";
    if (Array.isArray(authorization)) {
      authorizationString = authorization[0];
    } else {
      authorizationString = authorization;
    }

    return await this.authService.validateApiKey(authorizationString);
  }
}
