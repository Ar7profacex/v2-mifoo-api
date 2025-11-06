import { IAccount } from '@ar7profacex/shared';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Example1Service {
  private _logger: Logger = new Logger(Example1Service.name);

  async save(data: any, account: IAccount): Promise<string> {
    return 'Hello World!';
  }
}
