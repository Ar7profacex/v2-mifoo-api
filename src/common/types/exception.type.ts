import {
  ForbiddenCustomException,
  InvalidTokenException,
  MSErrorException,
  BadRequestCustomException,
  DbTransactionException,
  MsNotRespondingException,
  NotFoundCustomException,
  ProcessDocumentsException,
  UnauthorizedLoginException,
  InvalidApiKeyException,
} from "../interfaces/exceptions.interface";

export type Exception =
  | MsNotRespondingException
  | InvalidTokenException
  | InvalidApiKeyException
  | UnauthorizedLoginException
  | ForbiddenCustomException
  | MSErrorException
  | NotFoundCustomException
  | BadRequestCustomException
  | ProcessDocumentsException
  | DbTransactionException;
