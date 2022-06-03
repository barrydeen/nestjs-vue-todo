import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { StoreTodoDTO } from './dto/store.dto';
import { UpdateTodoDTO } from './dto/update.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async store(@Body() createTodoDTO: StoreTodoDTO) {
    return await this.todoService.store(createTodoDTO);
  } 

  @Get()
  async index(): Promise<Todo[]> {
    return await this.todoService.index();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return await this.todoService.show(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
    return await this.todoService.update(id, updateTodoDTO);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<DeleteResult> {
    return await this.todoService.destroy(id);
  }
}
