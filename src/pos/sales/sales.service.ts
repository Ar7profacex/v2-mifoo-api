import { EStatusShift, ExceptionEnum, IAccount } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosShift } from 'src/common/entities/pos-shift.entity';
import { ViewMtDashboard } from 'src/common/entities/view-mt-dashboard.entity';
import { HttpExceptionWM } from 'src/common/exceptions/http.exception';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  private _logger: Logger = new Logger(SalesService.name);

  constructor(
    @InjectRepository(PosShift)
    private posShiftRepository: Repository<PosShift>,
    @InjectRepository(ViewMtDashboard)
    private viewMtDashboardRepository: Repository<ViewMtDashboard>,
  ) { }

  async byShift(shiftId: string, account: IAccount): Promise<ViewMtDashboard[]> {
    const shift = await this.posShiftRepository.findOne({
      where: {
        uuId: shiftId
      }
    });
    if (!shift) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.NOT_FOUND,
        messageDetail: `shift_not_found`,
      });
    }

    return await this.viewMtDashboardRepository.find({
      relations: {
        posOrder: true,
        posDocument: true,
        posShift: true
      },
      select: {
        posOrder: {
          id: true,
          number: true,
          document: true,
        },
        posDocument: {
          id: true,
          number: true,
          document: true
        },
        posShift: {
          id: true,
          status: true,
          opened_at: true,
          closed_at: true,
        }
      },
      where: {
        idShift: shift.id
      },
      order: {
        dateTimeOrder: 'DESC'
      }
    });
  }

  async shiftsByPoint(pointId: number, account: IAccount): Promise<PosShift[]> {
    return await this.posShiftRepository.find({
      where: {
        fkid_pos_point: pointId
      },
      order: {
        opened_at: 'DESC'
      },
      take: 100
    });
  }
}
