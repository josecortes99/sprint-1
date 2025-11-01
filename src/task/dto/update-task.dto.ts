import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  
  @IsOptional()
  @IsString({ message: 'El título debe ser un texto' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'La descripcion debe ser un texto' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser un texto' })
  state?: string;
}
