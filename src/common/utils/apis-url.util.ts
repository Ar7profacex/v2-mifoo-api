import { Injectable } from "@nestjs/common";
import { MsUrl } from "../interfaces/string-object.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApisUrl {
  constructor(private readonly configService: ConfigService) { }

  getMsUrl(recurso: string = null): MsUrl {
    return {
      msApiV1: `${this.configService.get(
        "MS_API_V1"
      )}/${recurso}`,
      msApiV2: `${this.configService.get(
        "MS_API_V2"
      )}/${recurso}`
    };
  }
}
