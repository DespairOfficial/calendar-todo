import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
    @ApiProperty({
        example: 'USER',
        description: 'Name of role used in system ',
    })
    readonly value: string
    @ApiProperty({
        example: 'Basic role in system',
        description: 'Full description of created role',
    })
    readonly description: string
}
