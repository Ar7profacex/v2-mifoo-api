import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";

export const Account = createParamDecorator(
  (data: string = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cuenta: any =
      data !== null ? request.user[data] : request.user;

    if (!cuenta)
      throw new InternalServerErrorException("Cuenta no encontrada (request)");

    //GET TOKEN
    const header = request.headers;
    const authorization = header["authorization"];

    let authHeader = "";
    if (Array.isArray(authorization)) {
      authHeader = authorization[0];
    } else {
      authHeader = authorization;
    }

    const tokenArray = authHeader.split(" ", 2);
    cuenta.authToken = tokenArray[1];
    cuenta.typeAuthToken = tokenArray[0];
    //GET TOKEN

    return cuenta;
  }
);
