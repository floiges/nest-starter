import { ArgumentsHost } from '@nestjs/common';
// In order to delegate exception processing to the base filter, 
// you need to extend BaseExceptionFilter and call inherited catch() method. 
// Besides, HttpServer reference has to be injected and passed to the super() call
import { Catch, Inject, HttpServer } from "@nestjs/common";
import { BaseExceptionFilter, HTTP_SERVER_REF } from "@nestjs/core";

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
        super(applicationRef);
    }

    catch(exception: any, host: ArgumentsHost) {
        super.catch(exception, host);
    }
}

// Filters that extend base classes have to be instantiated by the framework itself 
// (don't manually create instances using new keyword but @UseFilters()).