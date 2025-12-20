import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected, Public } from "src/auth/decorators";
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

  @ApiOperation({ summary: `Endpoint para obtener cola de impresión` })
  @Public()
  @ApiParam({ name: "id", type: "string" })
  @Get("print-queue/:id")
  async printQueue(@Param("id") id: string) {
    const res = await this.appService.printQueue(id);
    return httpResponse(res, 'Cola obtenida correctamente', 200);
  }
}
