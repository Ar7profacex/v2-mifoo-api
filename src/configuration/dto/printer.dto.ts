import { ConfirmacionEnum, EConnectionPrinter, EPaperPrinter, IS_ENUM_MSG, IS_NUMBER_MSG, IS_STRING_MSG, IS_UUID_MSG, parseString } from '@ar7profacex/shared';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID, MaxLength, MinLength, IsEnum } from 'class-validator';

export class CreatePrinterDto {
    @IsInt({ message: IS_NUMBER_MSG })
    id: number;

    @IsString({ message: IS_STRING_MSG })
    @Transform(({ value }) => parseString(value, 'up'))
    @MinLength(6)
    @MaxLength(200)
    name: string;

    @IsString({ message: IS_STRING_MSG })
    @Transform(({ value }) => parseString(value, 'up'))
    @MinLength(3)
    @MaxLength(200)
    description: string;

    @IsUUID(4, { message: IS_UUID_MSG })
    path: string;

    @IsEnum(EPaperPrinter, { message: IS_ENUM_MSG })
    paper: EPaperPrinter;

    @IsEnum(ConfirmacionEnum, { message: IS_ENUM_MSG })
    default: ConfirmacionEnum;

    @IsEnum(EConnectionPrinter, { message: IS_ENUM_MSG })
    connection: EConnectionPrinter;

    @IsInt({ message: IS_NUMBER_MSG })
    @IsPositive()
    idMarket: number;

    @IsInt({ message: IS_NUMBER_MSG })
    @IsPositive()
    idPosPoint: number;
}
