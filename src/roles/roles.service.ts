import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable'
import { CreateRoleDto } from './dto/create-role.dto'
import { GiveRoleDto } from '../users/dto/give-role.dto'
import { Role } from './roles.model'

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
    async createRole(dto: CreateRoleDto) {
        try {
            const role: Role = await this.roleRepository.create(dto)
            return role
        } catch (error) {
            throw error
        }
    }
    async getRoleByValue(value: string) {
        try {
            const role: Role = await this.roleRepository.findOne({
                where: { value },
            })
            return role
        } catch (error) {
            throw error
        }
    }
}
