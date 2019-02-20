import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const isCached = true;
        if (isCached) {
            return of([]);
        }
        return call$;
    }
}