import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser un texto' })
  title: string;

  @IsString({ message: 'La descripcion debe ser un texto' })
  description: string;

  @IsString({ message: 'El estado debe ser un texto' })
  state: string;
}
