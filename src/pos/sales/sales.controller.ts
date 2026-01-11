import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected } from "src/auth/decorators";
import { httpResponse } from "src/common/utils/rest-comunication.util";
import { EAccess, EPermission, ETypeReport, IAccount } from "@ar7profacex/shared";
import { SalesService } from "./sales.service";

@ApiTags('Pos => Sales')
@Controller("pos/sales")
@ControllerProtected(EAccess.posSales)
export class SalesController {
  constructor(private readonly service: SalesService) { }

  @ApiOperation({ summary: `Endpoint para obtener ventas por punto` })
  @PermissionProtected(EPermission.view)
  @ApiParam({ name: 'pointId', required: true, type: 'number' })
  @Auth()
  @Get("shifts-by-point/:pointId")
  async shiftsByPoint(@Param('pointId', ParseIntPipe) pointId: number, @Account() account: IAccount) {
    const res = await this.service.shiftsByPoint(pointId, account);
    return httpResponse(res, 'Ventas por jornada obtenidas correctamente', 200);
  }

  @ApiOperation({ summary: `Endpoint para obtener ventas por jornada` })
  @PermissionProtected(EPermission.view)
  @ApiParam({ name: 'shiftId', required: true, type: 'string' })
  @ApiParam({ name: 'typeReport', required: true, type: 'enum', enum: ETypeReport })
  @Auth()
  @Get("by-shift/:shiftId/:typeReport")
  async byShift(@Param('shiftId', ParseUUIDPipe) shiftId: string, @Param('typeReport') typeReport: ETypeReport, @Account() account: IAccount) {
    const res = await this.service.byShift([shiftId], typeReport, account);
    return httpResponse(res, 'Ventas por jornada obtenidas correctamente', 200);
  }
}
