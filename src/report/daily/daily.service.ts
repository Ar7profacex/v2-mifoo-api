import { ETypeReport, IAccount } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';
import { SalesService } from 'src/pos/sales/sales.service';

@Injectable()
export class DailyService {
  private _logger: Logger = new Logger(DailyService.name);

  constructor(
    private salesService: SalesService
  ) { }

  async getData(shiftId: string[], typeReport: ETypeReport, account: IAccount): Promise<any[]> {
    return await this.salesService.byShift(shiftId, typeReport, account);
  }
}
