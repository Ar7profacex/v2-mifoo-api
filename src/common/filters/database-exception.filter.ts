import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import {
    QueryFailedError,
    EntityNotFoundError,
    CannotCreateEntityIdMapError,
    ConnectionNotFoundError,
    TypeORMError,
} from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, ConnectionNotFoundError, TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(DatabaseExceptionFilter.name);

    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.error(`Database error: ${exception.message}`, {
            name: exception.name,
            stack: exception.stack,
        });

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno en la base de datos';
        let messageDetail = 'UnknownErrorDatabase';

        if (exception instanceof EntityNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            messageDetail = 'EntityNotFoundError';
            message = 'Recurso no encontrado';
        } else if (exception instanceof QueryFailedError) {
            message = 'Error en la consulta de base de datos';
            messageDetail = 'EntityNotFoundError';
        } else if (exception instanceof ConnectionNotFoundError) {
            messageDetail = 'ConnectionNotFoundError';
            message = 'Error de conexión con la base de datos';
        }

        return response.status(statusCode).json({
            statusCode,
            messageDetail,
            message,
            timestamp: new Date().toISOString(),
            exceptionName: exception.name,
        });
    }
}