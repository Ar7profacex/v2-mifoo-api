import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Account, Auth, ControllerProtected, PermissionProtected } from "src/auth/decorators";
import { httpResponse } from "src/common/utils/rest-comunication.util";
import { EAccess, EPermission, ETypeReport, IAccount } from "@ar7profacex/shared";
import { DailyService } from "./daily.service";

@ApiTags('Report => Daily')
@Controller("report/daily")
@ControllerProtected(EAccess.posSales)
export class DailyController {
  constructor(private readonly service: DailyService) { }

  @ApiOperation({ summary: `Endpoint para obtener reporte diario` })
  @PermissionProtected(EPermission.view)
  @ApiParam({ name: 'shiftId', required: true, type: 'string' })
  @Auth()
  @Get("/:shiftId")
  async getData(@Param('shiftId', ParseUUIDPipe) shiftId: string, @Account() account: IAccount) {
    const res = await this.service.getData([shiftId], ETypeReport.daily, account);
    return httpResponse(res, 'Reporte diario obtenido correctamente', 200);
  }
}
