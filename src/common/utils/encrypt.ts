import * as CryptoJS from "crypto-js";
import { ES_HASH } from "./constants";
export class Encrypt {
  static AESEncrypt = (pureText: any) => {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(pureText), ES_HASH).toString()
    );
  };

  static AESDecrypt = (encryptedText: any = null) => {
    const bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(encryptedText),
      ES_HASH
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  static BS64Encrypt = (string: string): string => {
    let bs64 = btoa(`${ES_HASH}||${string}$$${ES_HASH}`);
    bs64 = bs64.replace(/=/g, "");
    return bs64;
  };

  static BS64Decrypt = (string: string): string => {
    let str = atob(string);
    str = str.replace(`${ES_HASH}||`, "");
    str = str.replace(`$$${ES_HASH}`, "");
    return str;
  };
}
