import { ConfirmacionEnum, EPrinterStatus, ExceptionEnum, getNow, IAccount, IPrinterStatus } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePrinterDto } from '../dto/printer.dto';
import { Not, Repository } from 'typeorm';
import { PosPrinter } from 'src/common/entities/pos-printer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionWM } from 'src/common/exceptions/http.exception';
import { PosPrintQueueEntity } from 'src/common/entities/pos-print-queue.entity';

@Injectable()
export class PrintersService {
  private _logger: Logger = new Logger(PrintersService.name);

  constructor(
    @InjectRepository(PosPrinter)
    private repository: Repository<PosPrinter>,
    @InjectRepository(PosPrintQueueEntity)
    private printQueueRepository: Repository<PosPrintQueueEntity>
  ) { }

  async save(data: CreatePrinterDto, account: IAccount): Promise<PosPrinter> {
    let { id } = data;

    if (id > 0) {
      const update = await this.repository.update({ id }, {
        name: data.name,
        description: data.description,
        connection: data.connection,
        config: { paper: data.paper },
        default: data.default,
        updated_at: getNow()
      });

      if (!update) {
        throw new HttpExceptionWM({
          type: ExceptionEnum.DB_TRANSACTION,
          message: "Error al actualizar la impresora"
        });
      }

    } else {
      const status = { namePrinter: '', hostData: '', soData: '', lastActivity: 'S/I', status: EPrinterStatus.OFFLINE } as IPrinterStatus;
      const save = await this.repository.save({
        name: data.name,
        description: data.description,
        connection: data.connection,
        ['default']: data.default,
        config: { paper: data.paper },
        status,
        path: data.path,
        fkid_pos_point: data.idPosPoint,
        sesion: account.user.id,
        created_at: getNow(),
        updated_at: getNow(),
      });

      if (!save) {
        throw new HttpExceptionWM({
          type: ExceptionEnum.DB_TRANSACTION,
          message: "Error al guardar la impresora"
        });
      }

      id = +save.id;
    }

    if (data.default === ConfirmacionEnum.SI) {
      await this.repository.update({ id: Not(id), fkid_pos_point: data.idPosPoint }, {
        default: ConfirmacionEnum.NO,//SOLO UNA IMPRESORA POR PUNTO PUEDE SER DEFAULT
      });
    }

    return await this.byId(id);
  }

  async byId(id: number): Promise<PosPrinter> {
    return this.repository.findOne({ where: { id } });
  }

  async printQueue(id: string): Promise<any> {
    const res = await this.printQueueRepository.findOne({ where: { id } });
    if (!res) {
      throw new HttpExceptionWM({
        type: ExceptionEnum.NOT_FOUND,
        message: "Cola de impresión no encontrada"
      });
    }
    return res.data;
  }
}
