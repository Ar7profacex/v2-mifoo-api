import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected } from "src/auth/decorators";
import { EPermission } from "src/common/enum/permission.enum";
import { PrintersService } from "./printers.service";
import { EAccess } from "src/common/enum/access.enum";
import { IAccount } from "src/auth/interfaces/auth.interface";
import { httpResponse } from "src/common/utils/rest-comunication.util";

@ApiTags('Configuration => Printers')
@Controller("configuration/printers")
@ControllerProtected(EAccess.configPrinters)
export class PrintersController {
  constructor(private readonly appService: PrintersService) { }

  @ApiOperation({ summary: `Endpoint para guardar impresora` })
  @PermissionProtected(EPermission.create, EPermission.update)
  @Auth()
  @Put("save")
  async save(@Body() data: any, @Account() account: IAccount) {
    const res = await this.appService.save(data, account);
    return httpResponse(res, 'Impresora guardada correctamente', 200);
  }
}
