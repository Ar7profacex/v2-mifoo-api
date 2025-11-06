import { Injectable } from "@nestjs/common";
import { AuthConfig } from "./auth-config";
import { HttpService } from "@nestjs/axios";
import { processHttpResponse } from "../common/utils/rest-comunication.util";
import { AuthResponse, DB_MAIN, ExceptionEnum, HttpExceptionResponse, X_API_KEY, X_CROSS_PLATFORM, X_REQUEST_PLATFORM } from "@ar7profacex/shared";
import { APP_PREFIX } from "src/common/utils/constants";

@Injectable()
export class AuthService {
    private schema: string = "";
    public crossPlatform: string = null;

    constructor(
        private readonly authConfig: AuthConfig,
        private readonly httpService: HttpService
    ) {
        this.schema = DB_MAIN;
    }

    async validate(token: string): Promise<AuthResponse> {
        const url = this.authConfig.authority;
        console.log(`🚀 ~ AuthService ~ validate ~ url:`, url)
        const authResponse = this.httpService.post<HttpExceptionResponse>(
            url,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    [X_REQUEST_PLATFORM]: APP_PREFIX,
                    [X_CROSS_PLATFORM]: this.crossPlatform ?? APP_PREFIX
                },
            }
        );

        //Si aparece una exception, se retorna error en esta linea, si es correcto termina funcion
        const response: HttpExceptionResponse = await processHttpResponse(
            url,
            authResponse,
            {
                type: ExceptionEnum.INVALID_TOKEN,
            }
        );

        return response?.data as AuthResponse;
    }

    async validateApiKey(apiKey: string): Promise<any> {
        const url = this.authConfig.validateApiKey;
        console.log(`🚀 ~ AuthService ~ validateApiKey ~ url:`, url)
        const authResponse = this.httpService.get<HttpExceptionResponse>(
            url,
            {
                headers: {
                    [X_API_KEY]: apiKey,
                    [X_REQUEST_PLATFORM]: APP_PREFIX,
                    [X_CROSS_PLATFORM]: this.crossPlatform ?? APP_PREFIX
                },
            }
        );

        //Si aparece una exception, se retorna error en esta linea, si es correcto termina funcion
        const response: HttpExceptionResponse = await processHttpResponse(
            url,
            authResponse,
            {
                type: ExceptionEnum.INVALID_API_KEY,
            }
        );

        return response?.data as { platform: string };
    }
}
