import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { getInternalServerErrorMsg, getNotFoundMsg } from 'src/common/utils/api-messages.util';

export const NotFound = <T>(
    resource: ClassConstructor<T>,
): ApiResponseOptions => ({
    schema: {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                example: HttpStatus.NOT_FOUND,
            },
            message: {
                type: 'string',
                example: getNotFoundMsg(resource.name),
            },
            error: {
                type: 'string',
                example: 'No Encontrado',
            },
            data: {
                type: 'any',
                example: 'null',
            }
        },
    },
});

export const Unauthorized: ApiResponseOptions = {
    schema: {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                example: HttpStatus.UNAUTHORIZED,
            },
            message: {
                type: 'string',
                example: "Unauthorized",
            },
            error: {
                type: 'string',
                example: 'Unauthorized',
            },
            data: {
                type: 'any',
                example: 'null',
            }
        },
    },
};

export const InternalError: ApiResponseOptions = {
    schema: {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                example: HttpStatus.INTERNAL_SERVER_ERROR,
            },
            message: {
                type: 'string',
                example: getInternalServerErrorMsg(),
            },
            error: {
                type: 'string',
                example: 'Error',
            },
            data: {
                type: 'any',
                example: 'null',
            }
        },
    },
};

export const ResponseCorrect: ApiResponseOptions = {
    schema: {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                example: `${HttpStatus.OK}|${HttpStatus.ACCEPTED}|${HttpStatus.CREATED}`,
            },
            message: {
                type: 'string',
                example: "Correcto",
            },
            data: {
                type: 'any',
                example: 'null|map|object|string|number|boolean',
            }
        },
    },
};
