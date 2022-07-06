import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles-auth.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles-guard'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { GiveRoleDto } from './dto/give-role.dto'
import { User } from './user.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersServies: UsersService) {}
    @ApiOperation({ summary: 'Get list of all users' })
    @ApiResponse({
        status: 200,
        type: [User],
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersServies.getAllUsers()
    }

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersServies.createUser(createUserDto)
    }

    @ApiOperation({ summary: 'Give a role to a user' })
    @ApiResponse({ status: 200, type: GiveRoleDto })
    @ApiParam({ name: 'value', example: 'USER' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/giveRole')
    giveRole(@Body() giveRoleDto: GiveRoleDto) {
        return this.usersServies.giveRoleToUser(giveRoleDto)
    }
}
