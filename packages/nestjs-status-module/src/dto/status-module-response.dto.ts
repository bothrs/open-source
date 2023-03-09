import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDateString, IsIn, IsInt, IsNumber, IsObject, IsOptional, IsSemVer, IsString, IsTimeZone } from "class-validator"


class StatusTimeObject {
    @IsDateString()
    @ApiProperty({ type: String })
    startup: string

    @IsDateString()
    @ApiProperty({ type: String })
    now: string

    @IsDateString()
    @ApiProperty({ type: String })
    UTC: string

    @IsTimeZone()
    @ApiProperty({ type: String })
    timeZone: string
}

class StatusProjectObject {
    @IsString()
    @ApiProperty({ type: String })
    name: string

    @IsSemVer()
    @ApiProperty({ type: String })
    version: string

    @IsIn(['local', 'development', 'staging', 'production'])
    @ApiProperty({ type: String })
    environment: string
}

class StatusNodeObject {
    @IsObject()
    @ApiProperty()
    versions: any

    @IsInt()
    @ApiProperty()
    port: number

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    debugPort?: number
}

class StatusSytemObject {
    @IsString()
    @ApiProperty()
    arch: string

    @IsString()
    @ApiProperty()
    platform: NodeJS.Platform

    @IsString()
    @ApiProperty()
    release: string

    @IsString()
    @ApiProperty()
    freeMemory: string

    @IsString()
    @ApiProperty()
    totalMemory: string

    @IsNumber({}, { each: true})
    @ApiProperty({ isArray: true, type: Number })
    loadAverage: number[]
}

class StatusModuleResponse {
    @IsIn(['OK'])
    @ApiProperty({type: String})
    status: string

    @IsObject()
    @ApiProperty({ type: StatusTimeObject })
    time: StatusTimeObject

    @IsObject()
    @ApiProperty({ type: StatusProjectObject})
    project: StatusProjectObject

    @IsObject()
    @ApiProperty({ type: StatusNodeObject})
    node: StatusNodeObject

    @IsObject()
    @ApiProperty({ type: StatusSytemObject})
    system: StatusSytemObject
}

export { StatusModuleResponse }