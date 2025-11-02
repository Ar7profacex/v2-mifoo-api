import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, } from "@nestjs/common";
import { HttpExceptionWM } from "../../common/exceptions/http.exception";
import { ExceptionEnum } from "../../common/enum/exception.enum";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { APP_PREFIX, X_CROSS_PLATFORM } from "../../common/utils/constants";
import { AuthResponse, IAccount, IAuthToken } from "../interfaces/auth.interface";
import { META_PERMISSIONS_PROTECTED } from "../decorators/permission-protected.decorator";
import { META_CONTROLLER_PROTECTED } from "../decorators/controller-protected.decorator";

@Injectable()
export class AuthCustomGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private authService: AuthService,
    private configService: ConfigService
  ) {
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const header = request.headers;
    const authorization = header["authorization"];
    const crossPlatform = header[X_CROSS_PLATFORM];

    let authorizationString = "";
    if (Array.isArray(authorization)) {
      authorizationString = authorization[0];
    } else {
      authorizationString = authorization;
    }

    if (!crossPlatform) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.FORBIDDEN,
        messageDetail: `El header cross-platform es requerido`,
      });
    }

    this.authService.crossPlatform = header["cross-platform"] || APP_PREFIX;
    const authorizedBy = await this.authorizedBy(authorizationString);
    request.account = authorizedBy.account as IAccount;
    request.authToken = authorizedBy.authToken as IAuthToken;

    if (!request.account)
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `Cuenta no encontrada (guard)`,
      });

    const requiredPermissions = this.reflector.get<string[]>(
      META_PERMISSIONS_PROTECTED,
      context.getHandler()
    );
    const controllerProtected = this.reflector.get<string>(
      META_CONTROLLER_PROTECTED,
      context.getClass() ?? context.getHandler()
    );

    //PERMISSION HANDLER
    if (requiredPermissions?.length) {
      const userPermissions = request.account.access.PERMISSION || {};
      if (!userPermissions.hasOwnProperty(controllerProtected)) {
        throw new HttpExceptionWM({
          type: ExceptionEnum.FORBIDDEN,
          messageDetail: `No tienes permisos suficientes (1)`,
        });
      }

      const controllerPermissions = userPermissions[controllerProtected] || [];
      const hasPermission = requiredPermissions.every((perm) =>
        controllerPermissions.includes(perm)
      );

      if (!hasPermission) {
        throw new HttpExceptionWM({
          type: ExceptionEnum.FORBIDDEN,
          messageDetail: `No tienes permisos suficientes (2)`,
        });
      }
    }

    return true;
  }

  private async authorizedBy(authHeader?: string): Promise<AuthResponse> {
    if (!authHeader) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `El encabezado de autorización es requerido`,
      });
    }
    const tokenArray = authHeader.split(" ", 2);
    if (!tokenArray[0] || tokenArray[0].toLowerCase() !== "bearer") {
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `El tipo de token no es válido`,
      });
    }

    return await this.authService.validate(tokenArray[1]);
  }
}
