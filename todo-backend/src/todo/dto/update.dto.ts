import { IsNumber, IsString } from "class-validator";

export class UpdateTodoDTO {
    @IsNumber()
    readonly id: number;

    @IsString()
    body: string;
}