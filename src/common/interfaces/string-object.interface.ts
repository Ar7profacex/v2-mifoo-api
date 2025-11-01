export interface StringsObject {
  [key: string]: string;
}

export interface MsUrl extends StringsObject {
  msApiV1: string;
  msApiV2: string;
}
