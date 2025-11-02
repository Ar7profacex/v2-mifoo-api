import { ExceptionEnum } from "../enum/exception.enum";
import { HttpExceptionResponse } from "./http-exception-response.interface";

export interface DomainException extends HttpExceptionResponse {
  type: ExceptionEnum;
}
export interface MsNotRespondingException extends DomainException {
  type: ExceptionEnum.MS_NOT_RESPONDING;
  url: string;
}

export interface InvalidTokenException extends DomainException {
  type: ExceptionEnum.INVALID_TOKEN;
  url?: string;
}

export interface UnauthorizedLoginException extends DomainException {
  type: ExceptionEnum.UNAUTHORIZED_LOGIN;
  url?: string;
}

export interface ProcessDocumentsException extends DomainException {
  type: ExceptionEnum.PROCESS_DOCUMENTS;
  url?: string;
}

export interface ForbiddenCustomException extends DomainException {
  type: ExceptionEnum.FORBIDDEN;
  url?: string;
}

export interface MSErrorException extends DomainException {
  type: ExceptionEnum.MS_ERROR;
  url: string;
}

export interface NotFoundCustomException extends DomainException {
  type: ExceptionEnum.NOT_FOUND;
  url?: string;
}

export interface BadRequestCustomException extends DomainException {
  type: ExceptionEnum.BAD_REQUEST;
  url?: string;
}

export interface DbTransactionException extends DomainException {
  type: ExceptionEnum.DB_TRANSACTION;
  url?: string;
}

export interface InvalidApiKeyException extends DomainException {
  type: ExceptionEnum.INVALID_API_KEY;
  url?: string;
}
