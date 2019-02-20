import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

/** 
 * The guards have a single responsibility. 
 * They determine whether a request shall be handled by the route handler or not. 
 * Guards are executed after each middleware, but before any pipe.
*/

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        /** 
         * if it returns true, the user call will be processed.
         * if it returns false, Nest will ignore a currently processed request.
        */
        // return validateRequest(request);
        return true;
    }
}