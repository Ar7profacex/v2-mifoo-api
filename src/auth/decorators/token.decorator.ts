import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: string = null, ctx: ExecutionContext) => {
        try {
            const request = ctx.switchToHttp().getRequest();

            const header = request.headers;
            const authorization = header['authorization'];

            let authHeader = '';
            if (Array.isArray(authorization)) {
                authHeader = authorization[0];
            } else {
                authHeader = authorization;
            }

            const tokenArray = authHeader.split(' ', 2);

            return tokenArray[1];
        } catch (e) {
            return null;
        }
    }
);
