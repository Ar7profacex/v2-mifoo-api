import { IAccount } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrintersService {
  private _logger: Logger = new Logger(PrintersService.name);

  async save(data: any, account: IAccount): Promise<string> {
    return 'Hello World!';
  }
}
