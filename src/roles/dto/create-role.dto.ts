import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty({
        example: 'USER',
        description: 'Name of role used in system ',
    })
    @IsString({ message: 'Must be string' })
    readonly value: string
    @ApiProperty({
        example: 'Basic role in system',
        description: 'Full description of created role',
    })
    @IsString({ message: 'Must be string' })
    readonly description: string
}
