import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, } from "@nestjs/common";
import { HttpExceptionWM } from "../../common/exceptions/http.exception";
import { ExceptionEnum } from "../../common/enum/exception.enum";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { APP_PREFIX } from "../../common/utils/constants";

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

    //===> VALIDAR ACCESOS Y RECURSOS NIVEL BACK
    this.authService.pathOriginMS = "";
    try {
      const versionApp = this.configService.get("API_VERSION");
      const prefixMS = `/v${versionApp}/acreditacion-${APP_PREFIX}/`;
      this.authService.pathOriginMS = request.path.replace(prefixMS, "");
    } catch (e) {

    }
    //===> VALIDAR ACCESOS Y RECURSOS NIVEL BACK

    const header = request.headers;
    const authorization = header["authorization"];

    let authorizationString = "";
    if (Array.isArray(authorization)) {
      authorizationString = authorization[0];
    } else {
      authorizationString = authorization;
    }

    request.user = await this.authorizedBy(authorizationString);
    const cuenta = request.user as any;
    const rolRecurso = APP_PREFIX;

    if (!cuenta)
      throw new InternalServerErrorException("Cuenta no encontrada (guard)");

    return true;
  }

  private async authorizedBy(authHeader?: string): Promise<any> {
    if (!authHeader) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `Es requerido el header para autorizar`,
      });
    }
    const tokenArray = authHeader.split(" ", 2);
    if (!tokenArray[0] || tokenArray[0].toLowerCase() !== "bearer") {
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `El token debe ser de tipo Bearer`,
      });
    }

    return await this.authService.validate(tokenArray[1]);
  }
}
