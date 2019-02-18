import { Module, Global } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

// @Global() // The @Global() decorator makes the module global-scoped
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService] // Now each module which would import the CatsModule has an access to the CatsService and will share the same instance with all of the modules that import this module as well.
})
export class CatsModule {}