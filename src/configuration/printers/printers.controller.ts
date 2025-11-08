import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected } from "src/auth/decorators";
import { PrintersService } from "./printers.service";
import { httpResponse } from "src/common/utils/rest-comunication.util";
import { EAccess, EPermission, IAccount } from "@ar7profacex/shared";
import { CreatePrinterDto } from "../dto/printer.dto";

@ApiTags('Configuration => Printers')
@Controller("configuration/printers")
@ControllerProtected(EAccess.configPrinters)
export class PrintersController {
  constructor(private readonly appService: PrintersService) { }

  @ApiOperation({ summary: `Endpoint para guardar impresora` })
  @PermissionProtected(EPermission.create, EPermission.update)
  @Auth()
  @Put("save")
  async save(@Body() data: CreatePrinterDto, @Account() account: IAccount) {
    const res = await this.appService.save(data, account);
    return httpResponse(res, 'Impresora guardada correctamente', 200);
  }
}
