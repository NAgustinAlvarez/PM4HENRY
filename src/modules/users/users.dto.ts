import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO para crear un nuevo usuario.
 * @example
 * {
 *   name: 'Juan Pérez',
 *   email: 'juan.perez@example.com',
 *   password: 'Password123!',
 *   phone: 1234567890,
 *   country: 'México',
 *   address: 'Calle Falsa 123',
 *   city: 'Ciudad de México',
 *   confirmPassword: 'Password123!'
 * }
 */
export class CreateUserDto {
  /**
   * Nombre completo del usuario.
   * Debe tener entre 3 y 80 caracteres.
   * @example 'Juan Pérez'
   */
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Correo electrónico del usuario.
   * Debe ser un correo válido.
   * @example 'juan.perez@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario.
   * Debe tener entre 8 y 15 caracteres, incluyendo al menos una letra mayúscula,
   * una letra minúscula, un número y un carácter especial (!@#$%^&*).
   * @example 'Password123!'
   */
  @IsNotEmpty()
  @IsString()
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  /**
   * Número de teléfono del usuario.
   * Debe ser un número válido.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  phone: number;
  @IsNotEmpty()
  @IsString()
  birthdate: string;
  /**
   * País del usuario (opcional).
   * Debe tener entre 5 y 15 caracteres.
   * @example 'México'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'El país debe tener entre 5 y 15 caracteres.',
  })
  country?: string;

  /**
   * Dirección del usuario (opcional).
   * Debe tener entre 3 y 80 caracteres.
   * @example 'Calle Falsa 123'
   */
  @IsOptional()
  @IsString()
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address?: string;

  /**
   * Ciudad del usuario (opcional).
   * Debe tener entre 5 y 20 caracteres.
   * @example 'Ciudad de México'
   */
  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'La ciudad debe tener entre 5 y 20 caracteres.',
  })
  city?: string;

  /**
   * Confirmación de la contraseña del usuario.
   * Debe coincidir con la contraseña proporcionada.
   * @example 'Password123!'
   */
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
