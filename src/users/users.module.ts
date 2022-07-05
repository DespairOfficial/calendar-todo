import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { Role } from 'src/roles/roles.model'
import { UsersRoles } from 'src/roles/users-roles.model'
import { RolesModule } from 'src/roles/roles.module'

@Module({
    imports: [
        SequelizeModule.forFeature([User, Role, UsersRoles]),
        RolesModule,
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
