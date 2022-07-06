import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles-auth.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles-guard'
import { CreateRoleDto } from './dto/create-role.dto'
import { GiveRoleDto } from '../users/dto/give-role.dto'
import { Role } from './roles.model'
import { RolesService } from './roles.service'

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(private roleService: RolesService) {}
    @ApiOperation({ summary: 'Creating a role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @ApiOperation({ summary: 'Creating a role' })
    @ApiResponse({ status: 200, type: Role })
    @ApiParam({ name: 'value', example: 'USER' })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
