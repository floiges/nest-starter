// All exception filters should implement the generic ExceptionFilter<T> interface. 
// It forces you to provide the catch(exception: T, host: ArgumentsHost) method with the valid signature. 
// T indicates a type of the exception.

import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // ArgumentsHost is nothing else than just an array of arguments
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}
