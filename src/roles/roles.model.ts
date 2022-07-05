import { ApiProperty } from '@nestjs/swagger'
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { User } from 'src/users/user.model'
import { UsersRoles } from './users-roles.model'

interface RoleCreatrionAttributes {
    value: string
    description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreatrionAttributes> {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({
        example: 'USER',
        description: 'Name, used in system for role',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string

    @ApiProperty({
        example: 'Basic role in system',
        description: 'Description of a role',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[]
}
