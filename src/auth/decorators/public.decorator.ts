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
import { X_API_KEY } from "src/common/utils/constants";
import { RequireCrossPlatformHeader } from "./cross-platform.decorator";

export const Public = () => {
  SetMetadata("isPublic", true);

  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiInternalServerErrorResponse(InternalError),
    ApiUnauthorizedResponse(Unauthorized),
    ApiOkResponse(ResponseCorrect),
    RequireCrossPlatformHeader(),
    ApiSecurity(X_API_KEY),
    UseGuards(AuthPublicGuard)
  );
};
