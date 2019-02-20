import * as Joi from 'joi';
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema) {}
    
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = Joi.validate(value, this.schema);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}