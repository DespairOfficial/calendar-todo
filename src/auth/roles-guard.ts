import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { Role } from 'src/roles/roles.model'
import { ROLES_KEY } from './decorators/roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles: string[] = this.reflector.getAllAndOverride(
                ROLES_KEY,
                [(context.getClass(), context.getHandler())], // to extract metadata from controller and method
            )
            if (!requiredRoles) {
                return true
            }
            const req: Request = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User in not authorized' })
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some((role: Role) => requiredRoles.includes(role.value))
        } catch (error) {
            throw new HttpException({ message: 'Something went wrong' }, HttpStatus.BAD_REQUEST)
        }
    }
}
