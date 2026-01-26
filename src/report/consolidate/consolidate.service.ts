import { ETypeReport, ExceptionEnum, IAccount } from "@ar7profacex/shared";
import { Injectable, Logger } from "@nestjs/common";
import { SalesService } from "src/pos/sales/sales.service";
import { ConsolidateDto } from "../dto/consolidate.dto";
import { PosShift } from "src/common/entities/pos-shift.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { HttpExceptionWM } from "src/common/exceptions/http.exception";

@Injectable()
export class ConsolidateService {
  private _logger: Logger = new Logger(ConsolidateService.name);

  constructor(
    private salesService: SalesService,
    @InjectRepository(PosShift)
    private posShiftRepository: Repository<PosShift>,
  ) {}

  async getData(
    data: ConsolidateDto,
    typeReport: ETypeReport,
    account: IAccount,
  ): Promise<any[]> {
    const start = new Date(data.dateRange.start);
    start.setHours(0, 0, 0, 0);

    const end = new Date(data.dateRange.end);
    end.setHours(23, 59, 59, 999);

    const shifts = await this.posShiftRepository
      .createQueryBuilder("s")
      .innerJoin("s.point", "p")
      .innerJoin("p.posMarket", "m")
      .where("m.id = :idMarket", { idMarket: data.idMarket })
      .andWhere("s.opened_at <= :end", { end })
      .andWhere("(s.closed_at IS NULL OR s.closed_at >= :start)", { start })
      .orderBy("s.opened_at", "DESC")
      .getMany();

    if (shifts.length === 0) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.NOT_FOUND,
        messageDetail: `consolidate_not_found`,
      });
    }

    const shiftId = shifts.map((shift) => shift.uuId);
    return await this.salesService.byShift(shiftId, typeReport, account);
  }
}
