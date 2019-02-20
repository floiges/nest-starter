import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        // After 5 seconds the request processing will be canceled.
        return call$.pipe(timeout(5000));
    }
}