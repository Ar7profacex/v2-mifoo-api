import { Injectable } from "@nestjs/common";
import { ApisUrl } from "../common/utils/apis-url.util";

@Injectable()
export class AuthConfig {
  public authority: string = "";
  public validateApiKey: string = "";

  constructor(private readonly apisUrl: ApisUrl) {
    this.authority = this.apisUrl.getMsUrl("account/validate").msApiV1;
    this.validateApiKey = this.apisUrl.getMsUrl("account/validate-api-key").msApiV1;
  }
}
