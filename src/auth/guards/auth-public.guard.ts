import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpExceptionWM } from "../../common/exceptions/http.exception";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ExceptionEnum, X_API_KEY, X_CROSS_PLATFORM } from "@ar7profacex/shared";

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
    const authorization = header[X_API_KEY];
    const crossPlatform = header[X_CROSS_PLATFORM];

    if (!authorization) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_API_KEY,
        messageDetail: `La clave API es requerida`,
      });
    }

    if (!crossPlatform) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.FORBIDDEN,
        messageDetail: `El header cross-platform es requerido`,
      });
    }

    let authorizationString = "";
    if (Array.isArray(authorization)) {
      authorizationString = authorization[0];
    } else {
      authorizationString = authorization;
    }

    this.authService.crossPlatform = crossPlatform;
    return await this.authService.validateApiKey(authorizationString);
  }
}
