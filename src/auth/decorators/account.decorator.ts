import { ExceptionEnum, IAccount } from "@ar7profacex/shared";
import {
  createParamDecorator,
  ExecutionContext
} from "@nestjs/common";
import { HttpExceptionWM } from "src/common/exceptions/http.exception";

export const Account = createParamDecorator(
  (data: string = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const account: IAccount =
      (data !== null ? request.user[data] : request.user) as IAccount;

    if (!account)
      throw new HttpExceptionWM({
        type: ExceptionEnum.INVALID_TOKEN,
        messageDetail: `Cuenta no encontrada (decorator)`,
      });

    return account;
  }
);
