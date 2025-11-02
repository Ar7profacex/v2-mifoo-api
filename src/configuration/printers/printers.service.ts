import { Injectable, Logger } from '@nestjs/common';
import { IAccount } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class PrintersService {
  private _logger: Logger = new Logger(PrintersService.name);

  async save(data: any, account: IAccount): Promise<string> {
    return 'Hello World!';
  }
}
