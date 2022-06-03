import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { StoreTodoDTO } from './dto/store.dto';
import { UpdateTodoDTO } from './dto/update.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) {}

    async store(storeTodoDTO: StoreTodoDTO): Promise<Todo> {
        return await this.todoRepository.save(storeTodoDTO);
    }

    async index(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async show(id: number): Promise<Todo> {
        return await this.todoRepository.findOne(id);
    }

    async update(id: number, updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
        const updatedTodo = await this.todoRepository.update(id,updateTodoDTO);
        if (!updatedTodo.affected) {
            throw new NotFoundException;
        }

        return this.todoRepository.findOne(id);
    }

    async destroy(id: number): Promise<DeleteResult> {
        const deletedTodo = await this.todoRepository.delete(id);
        if (!deletedTodo.affected) {
            throw new NotFoundException;
        }

        return deletedTodo;
    }
}
