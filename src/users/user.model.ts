import { ApiProperty } from '@nestjs/swagger'
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model'
import { UsersRoles } from 'src/roles/users-roles.model'

interface UserCreatrionAttributes {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreatrionAttributes> {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number
    @ApiProperty({
        example: 'user@mail.com',
        description: 'Email of user, unique ',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string
    @ApiProperty({
        example: 'asdf_1s!@41$#afafg9',
        description: 'Password. Stored in hased form',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[]
}
