import { Observable, throwError } from 'rxjs';
import { Injectable, NestInterceptor, HttpException, HttpStatus, ExecutionContext } from "@nestjs/common";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        return call$.pipe(
            catchError(err => 
                throwError(new HttpException('Message', HttpStatus.BAD_GATEWAY))),
        );
    }
}