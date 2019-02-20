import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

// A pipe transforms the input data to the desired output. 
// Also, it could take care of the validation, 
// since it's possible to throw an exception when the data is incorrect.

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('validation failed');
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}