import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    login(@Body() createUserDto: CreateUserDto) {
        return this.authService.login()
    }
    @Post('registration')
    registration() {}
}
