import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  Account,
  Auth,
  ControllerProtected,
  PermissionProtected,
} from "src/auth/decorators";
import { httpResponse } from "src/common/utils/rest-comunication.util";
import {
  EAccess,
  EPermission,
  ETypeReport,
  IAccount,
} from "@ar7profacex/shared";
import { ConsolidateService } from "./consolidate.service";
import { ConsolidateDto } from "../dto/consolidate.dto";

@ApiTags("Report => Consolidate")
@Controller("report/consolidate")
@ControllerProtected(EAccess.posSales)
export class ConsolidateController {
  constructor(private readonly service: ConsolidateService) {}

  @ApiOperation({ summary: `Endpoint para obtener reporte consolidado` })
  @PermissionProtected(EPermission.view)
  @Auth()
  @Post("/")
  async getData(@Body() body: ConsolidateDto, @Account() account: IAccount) {
    const res = await this.service.getData(
      body,
      ETypeReport.consolidated,
      account,
    );
    return httpResponse(res, "Reporte consolidado obtenido correctamente", 200);
  }
}
