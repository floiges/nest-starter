import { Controller, Get, Post, HttpCode, Header, Param, Body, Res, HttpStatus, HttpException, UseFilters, UsePipes, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { MyForbiddenException } from 'src/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/exceptions/http-filter.exception';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) 
@UseGuards(RolesGuard)
export class CatsController {
    // inject CatsService through the constructor
    constructor(private readonly catsSerVice: CatsService) {}
    // @Get('ab*cd') // 匹配通配符
    // every async function has to return promise
    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsSerVice.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id) {
        console.log(id);
        return `This action returns a #${id} cat`;
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    // @UseFilters(HttpExceptionFilter) // 绑定异常 filter
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    @Roles('admin')
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        // this.catsSerVice.create(createCatDto);
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN,
        //     error: 'This is a custom message'
        // }, 403);
        throw new MyForbiddenException();
    }
}