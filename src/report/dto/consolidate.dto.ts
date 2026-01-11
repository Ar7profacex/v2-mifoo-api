import { IsArray, IsNotEmpty } from "class-validator";

export class ConsolidateDto {

    @IsArray()
    @IsNotEmpty()
    shiftId: string[];
}