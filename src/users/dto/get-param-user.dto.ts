import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class GetUserParamDto {
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean) // convert value type
    isMarried: boolean
}