import { ConfirmacionesEnum } from "src/common/enum/confirmaciones.enum";
import { EPermission } from "src/common/enum/permission.enum";
import { Shortcut } from "../types/shorcut.type";

export interface AuthResponse {
    authToken: IAuthToken;
    account: IAccount;
}

export interface IAuthToken {
    token: string;
    type: string;
    name: string;
    expires_at: string;
}

export interface IAccount {
    access: AccessUserInterface;
    company: CompanyUserInterface;
    country: CountryUserInterface;
    profile: string;
    shortcuts: Shortcut[];
    user: AccountUserInterface;
}

export interface CountryUserInterface {
    idCountry: number,
    country: string,
    unityMoney: string,
    simbolMoney: string,
    codePhone: string,
    validateRut: boolean
}

export interface AccessUserInterface {
    MENUS: MenuAccessInterface[],
    SUB_MENUS: SubMenuAccessInterface[],
    ACCESS: string[],
    PERMISSION: Record<string, EPermission[]>,
}

export interface MenuAccessInterface {
    ID: number,
    SORT: number,
    ICON: string,
    TITLE: string,
    ACTION: string,
    NAME: string,
    MENU: ConfirmacionesEnum

}

export interface SubMenuAccessInterface {
    ID: number,
    SORT: number,
    ICON: string,
    TITLE: string,
    ACTION: string,
    NAME: string,
    MENU: ConfirmacionesEnum,
    ID_NP: number
}

export interface CompanyUserInterface {
    idCompany: number,
    company: string,
    idMarket: number,
    market: string,
    configMarket: IConfigMarket | null,
    idPointSale: number,
    point: string,
    idPrinter: number,
    printer: string | null
}

export interface IConfigMarket {
    hourFinish?: number,
    hourStart?: number,
    productsNewSale: number,
    timezone: string,
    valueExtraDressings: number,
    valueExtraIngredients: number
}

export interface Printer {
    config: PrinterConfig;
    path: string;
    connection: string;
}

export interface PrinterConfig {
    paper: number;
}

export interface Country {
    idCountry: number;
    country: string;
    unityMoney: string;
    simbolMoney: string;
    codePhone: string;
    validateRut: boolean;
}

export interface AccountUserInterface {
    id: number,
    name: string,
    email: string,
    email_verified_at: string | null,
    active: ConfirmacionesEnum,
    google_id: string | null,
    sesion: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
    data?: AccountUserDataInterface,
    avatar?: string;
    status?: string;
}

export interface AccountUserDataInterface {
    id: number,
    avatar: string | null,
    phone: string | null,
    birthday: string,
    nick: string,
    type: string,
    config: any[],
    fkid_profile: number,
    fkid_user: number,
    sesion: number,
    created_at: string,
    updated_at: string,
    deleted_at: string | null
}
