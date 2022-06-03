import { IsString } from "class-validator";

export class StoreTodoDTO {
    @IsString()
    body: string;
}