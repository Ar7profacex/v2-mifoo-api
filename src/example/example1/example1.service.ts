import { Injectable, Logger } from '@nestjs/common';
import { IAccount } from 'src/auth/interfaces/auth.interface';

@Injectable()
export class Example1Service {
  private _logger: Logger = new Logger(Example1Service.name);

  async save(data: any, account: IAccount): Promise<string> {
    return 'Hello World!';
  }
}
