import {
  IsArray,
  IsNotEmpty,
  IsUUID,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Products } from 'src/modules/products/product.entity';

export class CreateOrderDto {
  /**
   * ID del usuario que realiza la orden.
   * Debe ser un UUID válido.
   * @example '550e8400-e29b-41d4-a716-446655440000'
   */
  @IsNotEmpty({ message: 'Se requiere que el userId no esté vacío.' })
  @IsUUID('4', { message: 'El userId debe tener un formato UUID válido.' })
  userId: string;

  /**
   * Lista de productos incluidos en la orden.
   * Debe contener al menos un producto.
   * @example [
   *   { id: '1', name: 'Producto 1', price: 10.99 },
   *   { id: '2', name: 'Producto 2', price: 20.99 }
   * ]
   */
  @IsArray({ message: 'Se espera que products sea un array.' })
  @ArrayMinSize(1, {
    message: 'El array products debe contener al menos un elemento.',
  })
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Partial<Products>[];
}
