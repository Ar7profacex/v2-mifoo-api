import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpExceptionWM } from '../exceptions/http.exception';
import { HttpStatus } from "@nestjs/common";
import { Exception, HttpCorrectResponse, HttpExceptionResponse } from '@ar7profacex/shared';

export const processHttpResponse = async <T>(
    url: string,
    msResponse: Observable<AxiosResponse<T>>,
    exception: Exception,
): Promise<T> =>
    await firstValueFrom(
        msResponse.pipe(
            catchError((error) => {
                const httpException = error.response?.data as HttpExceptionResponse;
                throw new HttpExceptionWM({
                    ...exception,
                    remoteExceptionName: httpException?.exceptionName || error.name,
                    exceptionName: exception.exceptionName || error.name,
                    message: httpException?.message || error.message,
                    messageDetail: httpException?.messageDetail || error.message,
                });
            }),
            map(({ data }) => data),
        ),
    );

export const processHttpResponseSync = <T>(
    url: string,
    msResponse: Observable<AxiosResponse<T>>,
): void => {
    firstValueFrom(msResponse.pipe(map(({ data }) => data))).then(r => console.log(r));
};

export const httpResponse = (data: any = null, message: string | null = 'Correcto', statusCode: number = HttpStatus.OK): HttpCorrectResponse => {
    return {
        statusCode,
        success: statusCode >= 200 && statusCode < 300,
        message,
        msg: message,
        data
    }
}
