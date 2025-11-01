import { SwaggerConfig } from './swagger.interface';
import { APP_PREFIX } from "../common/utils/constants";

export const SWAGGER_CONFIG: SwaggerConfig = {
    title: `Microservicio ${APP_PREFIX}`,
    description:
        `Microservicio que provee funcionalidades para el modulo de ${APP_PREFIX}`,
    version: `v${process.env.API_VERSION}`,
    tags: [],
};

export const SWAGGER_USER = 'sw_user_doc';
export const SWAGGER_PASS = '4r2erc345erfwcdfj434S@';
