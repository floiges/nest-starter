import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

// The middleware is a function which is called before the route handler
// The Nest middleware is either a function, or a class with an @Injectable() decorator

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     resolve(name: string): MiddlewareFunction {
//         // The resolve() method has to return a regular library-specific middleware (req, res, next) => any.
//         return (req, res, next) => {
//             // await someAsyncJob();
//             console.log(`[${name}]Request...`);
//             next();
//         };
//     }
// }

// functional middleware
export function logger(req, res, next) {
    console.log('Request....');
    next();
}