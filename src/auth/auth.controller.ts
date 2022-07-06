import { Body, Controller, Post } from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
const TOKEN_EXAMPLE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IiJ9.eyJzdWIiOiIiLCJuYW1lIjoiIiwiaWF0IjoxMjAzMjN9.13hSdKXX8nSdbb7MnPjbIVMxp3r2jzNEaMs0r06pJsY'
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @ApiOperation({ summary: 'Loggin in ' })
    @ApiResponse({
        status: 200,
        schema: {
            example: TOKEN_EXAMPLE,
        },
    })
    @Post('login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('registration')
    @ApiOperation({ summary: 'Registration ' })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                token: TOKEN_EXAMPLE,
            },
        },
    })
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
