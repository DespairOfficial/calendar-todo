import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(private usersServise: UsersService) {}
    async login() {
        return ''
    }
}
