import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  InternalError,
  ResponseCorrect,
  Unauthorized,
} from "../../swagger/swagger.api-reponse";
import { AuthPublicGuard } from "../guards/auth-public.guard";

export const Public = () => {
  SetMetadata("isPublic", true);

  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiInternalServerErrorResponse(InternalError),
    ApiUnauthorizedResponse(Unauthorized),
    ApiOkResponse(ResponseCorrect),
    ApiSecurity("x-api-key"),
    UseGuards(AuthPublicGuard)
  );
};
