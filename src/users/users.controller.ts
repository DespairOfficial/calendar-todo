import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersServies: UsersService) {}
    @ApiOperation({ summary: 'Get list of all users' })
    @ApiResponse({
        status: 200,
        type: [User],
    })
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
}
