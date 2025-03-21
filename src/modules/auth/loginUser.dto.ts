import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO para iniciar sesión de un usuario.
 * @example
 * {
 *   email: 'juattttz@example.com',
 *   password: 'Password123!'
 * }
 */
export class LoginUserDto {
  /**
   * Correo electrónico del usuario.
   * Debe ser un correo válido.
   * @example 'juattttz@example.com'
   */
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario.
   * Debe tener al menos 6 caracteres.
   * @example 'Password123!'
   */
  @IsString()
  @MinLength(6)
  password: string;
}
