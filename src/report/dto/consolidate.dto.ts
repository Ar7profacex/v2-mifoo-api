import { IS_DATE_MSG, IS_NUMBER_MSG } from "@ar7profacex/shared";
import { Type } from "class-transformer";
import { IsDateString, IsInt, ValidateNested } from "class-validator";

export class DateRangeDto {
  @IsDateString({ message: IS_DATE_MSG })
  start: string;

  @IsDateString({ message: IS_DATE_MSG })
  end: string;
}
export class ConsolidateDto {
  @ValidateNested()
  @Type(() => DateRangeDto)
  dateRange: DateRangeDto;

  @IsInt({ message: IS_NUMBER_MSG })
  idMarket: number;
}
