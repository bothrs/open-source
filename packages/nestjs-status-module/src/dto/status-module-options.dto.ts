import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsSemVer, IsString, IsTimeZone } from "class-validator";

class StatusModuleOptions {
    @IsString()
    @ApiProperty()
    name: string

    @IsSemVer()
    @ApiProperty()
    version: string

    @IsIn(['local', 'development', 'staging', 'production'])
    @ApiProperty()
    environment: string

    @IsInt()
    @ApiProperty()
    port: number

    @IsTimeZone()
    @ApiPropertyOptional()
    timeZone?: string
}

export { StatusModuleOptions }