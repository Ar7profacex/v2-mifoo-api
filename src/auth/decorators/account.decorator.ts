import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { IAccount } from "../interfaces/auth.interface";
import { HttpExceptionWM } from "src/common/exceptions/http.exception";
import { ExceptionEnum } from "src/common/enum/exception.enum";

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
