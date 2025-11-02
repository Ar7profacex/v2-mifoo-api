import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Auth, CrossPlatform, PermissionProtected, Public } from "./auth/decorators";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EPermission } from "./common/enum/permission.enum";
import { ControllerProtected } from "./auth/decorators/controller-protected.decorator";
import { EAccess } from "./common/enum/access.enum";
import { httpResponse } from "./common/utils/rest-comunication.util";

@ApiTags('App')
@Controller()
@ControllerProtected(EAccess.configPrinters)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: `Endpoint health check` })
  @Get()
  healtCheck() {
    return this.appService.healtCheck();
  }

  @ApiOperation({ summary: `Endpoint de prueba AUTH` })
  @PermissionProtected(EPermission.create, EPermission.update, EPermission.delete)
  @Auth()
  @Get("auth-hello")
  getHello(@CrossPlatform() platform: string) {
    const res = this.appService.getHello();
    return httpResponse({ res, platform }, 'Auth Hello Endpoint', 200);
  }

  @ApiOperation({ summary: `Endpoint de prueba PUBLIC` })
  @Public()
  @Get("public-hello")
  getHello2(@CrossPlatform() platform: string) {
    const res = this.appService.getHello();
    return httpResponse({ res, platform }, 'Public Hello Endpoint', 200);
  }
}
