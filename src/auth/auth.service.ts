import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model'
@Injectable()
export class AuthService {
    private generateToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
        }
    }
    private async validateUser(userDto: CreateUserDto) {
        try {
            const user = await this.usersService.getUserByEmail(userDto.email)
            if (user) {
                const passwordPassed = await bcrypt.compare(
                    userDto.password,
                    user.password,
                )
                if (passwordPassed) {
                    return user
                }
            }
            throw new UnauthorizedException({
                message: 'Wrong email or password',
            })
        } catch (error) {
            throw error
        }
    }
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }
    async registration(userDto: CreateUserDto) {
        try {
            const candidate: User = await this.usersService.getUserByEmail(
                userDto.email,
            )
            if (candidate) {
                throw new HttpException(
                    'User with this email already exists',
                    HttpStatus.BAD_REQUEST,
                )
            }
            const hashedPassword = await bcrypt.hash(userDto.password, 7)
            const user: User = await this.usersService.createUser({
                ...userDto,
                password: hashedPassword,
            })
            return this.generateToken(user)
        } catch (error) {
            throw error
        }
    }
}
