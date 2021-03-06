import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from 'src/roles/roles.model'
import { RolesService } from 'src/roles/roles.service'

import { CreateUserDto } from './dto/create-user.dto'
import { GiveRoleDto } from './dto/give-role.dto'
import { User } from './user.model'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
    ) {}
    async getAllUsers() {
        try {
            const users = await this.userRepository.findAll({ include: Role })
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto)
            const role = await this.rolesService.getRoleByValue('USER')
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user
        } catch (e) {
            console.log(e)
        }
    }
    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                include: Role,
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async giveRoleToUser(giveRoleDto: GiveRoleDto) {
        try {
            const user = await this.userRepository.findByPk(giveRoleDto.userId)
            const role = await this.rolesService.getRoleByValue(giveRoleDto.value)
            if (user && role) {
                await user.$add('roles', role.id)
                return giveRoleDto
            }
            throw new HttpException('User or role does not exist', HttpStatus.NOT_FOUND)
        } catch (error) {
            throw error
        }
    }
}
