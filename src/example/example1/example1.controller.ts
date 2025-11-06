import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected } from "src/auth/decorators";
import { httpResponse } from "src/common/utils/rest-comunication.util";
import { Example1Service } from "./example1.service";
import { EAccess, EPermission, IAccount } from "@ar7profacex/shared";

@ApiTags('Example => Example1')
@Controller("example/example1")
@ControllerProtected(EAccess.home)
export class Example1Controller {
  constructor(private readonly service: Example1Service) { }

  @ApiOperation({ summary: `Endpoint de ejemplo 1` })
  @PermissionProtected(EPermission.create, EPermission.update)
  @Auth()
  @Put("save")
  async save(@Body() data: any, @Account() account: IAccount) {
    const res = await this.service.save(data, account);
    return httpResponse(res, 'Example1 guardada correctamente', 200);
  }
}
