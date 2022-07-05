import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'

import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users/user.model'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { UsersRoles } from './roles/users-roles.model'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),

        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadModels: true,
            models: [User, Role, UsersRoles],
        }),
        UsersModule,
        AuthModule,
        RolesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
