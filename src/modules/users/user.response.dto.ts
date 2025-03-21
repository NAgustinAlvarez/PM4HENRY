import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  id: string; // Asumiendo que el ID es un string (UUID)

  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  @Length(5, 15, {
    message: 'El país debe tener entre 5 y 15 caracteres.',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  adress?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres.',
  })
  city?: string;

  @IsOptional()
  @IsString()
  role?: string; // Agregar un campo para el rol del usuario

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
