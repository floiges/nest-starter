import { Controller, Get, Post, HttpCode, Header, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
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
    findOne(@Param('id') id) {
        console.log(id);
        return `This action returns a #${id} cat`;
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsSerVice.create(createCatDto);
    }
}