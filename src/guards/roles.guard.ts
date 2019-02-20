import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // In the node.js world, it's a common practice to attach the authorized user to the request object. 
        // That's why we assumed that request.user contains the user instance.
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        // In fact, the guard which returns false throws HttpException. 
        // If you want to return a different error response to the end-user, you should throw an exception. 
        // Afterward, this exception can be caught by the exception filter .
        return user && user.roles && hasRole();
    }
}