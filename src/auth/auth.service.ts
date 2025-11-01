import { Injectable } from "@nestjs/common";
import { AuthConfig } from "./auth-config";
import { HttpService } from "@nestjs/axios";
import { processHttpResponse } from "../common/utils/rest-comunication.util";
import { HttpExceptionResponse } from "../common/interfaces/http-exception-response.interface";
import { APP_PREFIX, DB_MAIN } from "src/common/utils/constants";
import { ApisUrl } from "src/common/utils/apis-url.util";
import { ExceptionEnum } from "src/common/enum/exception.enum";

@Injectable()
export class AuthService {
    private schema: string = "";
    public pathOriginMS: string = "";

    constructor(
        private readonly authConfig: AuthConfig,
        private readonly apisUrl: ApisUrl,
        private readonly httpService: HttpService
    ) {
        this.schema = DB_MAIN;
        this.pathOriginMS = "";
    }

    async validate(token: string): Promise<any> {
        const url = this.authConfig.authority;
        const authResponse = this.httpService.get<HttpExceptionResponse>(
            url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    PathOriginMS: this.pathOriginMS,
                    OriginMS: APP_PREFIX
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

        return response.data as any;
    }

    async validateApiKey(apiKey: string): Promise<any> {
        const url = this.authConfig.validateApiKey;
        const authResponse = this.httpService.get<HttpExceptionResponse>(
            url,
            {
                headers: {
                    "x-api-key": apiKey,
                    PathOriginMS: this.pathOriginMS,
                    OriginMS: APP_PREFIX
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

        return response.data as any;
    }
}
