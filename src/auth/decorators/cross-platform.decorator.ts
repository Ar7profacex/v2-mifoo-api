import { applyDecorators, InternalServerErrorException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiSecurity, ApiHeader } from '@nestjs/swagger';
import { X_CROSS_PLATFORM } from 'src/common/utils/constants';

export function RequireCrossPlatformHeader() {
    return applyDecorators(
        ApiSecurity(X_CROSS_PLATFORM),
        ApiHeader({
            name: X_CROSS_PLATFORM,
            description: 'Cross-platform identificador',
            required: true,
        }),
    );
}

export const CrossPlatform = createParamDecorator(
    (data: string = null, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        const header = request.headers;
        let crossPlatform = header[X_CROSS_PLATFORM];

        if (!crossPlatform) {
            throw new InternalServerErrorException("CrossPlatform: Tenant no capturado (request)");
        }

        return crossPlatform;
    }
);
