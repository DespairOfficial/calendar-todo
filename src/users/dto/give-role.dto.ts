import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class GiveRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Value of a role' })
    @IsString({ message: 'Must be string' })
    readonly value: string
    @ApiProperty({ example: '1', description: 'Id of user' })
    @IsNumber({}, { message: 'Must be number' })
    readonly userId: number
}
