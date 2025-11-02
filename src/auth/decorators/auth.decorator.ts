import {
    applyDecorators, HttpCode, HttpStatus, SetMetadata,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthCustomGuard } from "../guards/auth-custom.guard";
import { InternalError, ResponseCorrect, Unauthorized } from "../../swagger/swagger.api-reponse";
import { EPermission } from "src/common/enum/permission.enum";
import { PermissionProtected } from "./permission-protected.decorator";
import { RequireCrossPlatformHeader } from "./cross-platform.decorator";

export const Auth = (...permissions: EPermission[]) => {
    SetMetadata('isPublic', false);

    //SI LOS ARGS ROLES ES VACIO, ES PARA CUALQUIER TIPO DE USUARIO
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiInternalServerErrorResponse(InternalError),
        ApiUnauthorizedResponse(Unauthorized),
        ApiOkResponse(ResponseCorrect),
        ApiBearerAuth(),
        RequireCrossPlatformHeader(),
        PermissionProtected(...permissions),
        UseGuards(AuthCustomGuard)
    );
}