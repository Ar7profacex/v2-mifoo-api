import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IAuthToken } from "../interfaces/auth.interface";
import { HttpExceptionWM } from "src/common/exceptions/http.exception";
import { ExceptionEnum } from "src/common/enum/exception.enum";

export const Token = createParamDecorator(
    (data: string = null, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authToken: IAuthToken =
            (data !== null ? request.authToken[data] : request.authToken) as IAuthToken;

        if (!authToken)
            throw new HttpExceptionWM({
                type: ExceptionEnum.INVALID_TOKEN,
                messageDetail: `Cuenta no encontrada (decorator)`,
            });

        return authToken;
    }
);
