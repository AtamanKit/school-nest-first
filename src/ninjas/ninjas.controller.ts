import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) { }

    // GET /ninjas?weapon=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchunks') {
        // const service = new NinjasService();
        return this.ninjasService.getNinjas(weapon);
    }

    // GET /ninjas/:id --> {}
    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        try {
            return this.ninjasService.getNinja(+id);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    // POST /ninjas --> {}
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto);
    }

    // PUT /ninjas/:id --> {}
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(+id, updateNinjaDto)
    }

    // Delete /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjasService.removeNinja(+id)
    }
}
