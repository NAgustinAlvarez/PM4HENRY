import {
  IsArray,
  IsNotEmpty,
  IsUUID,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductIdDto {
  @IsNotEmpty({ message: 'Se requiere que el id del producto no esté vacío.' })
  @IsUUID('4', {
    message: 'El id del producto debe tener un formato UUID válido.',
  })
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Se requiere que el userId no esté vacío.' })
  @IsUUID('4', { message: 'El userId debe tener un formato UUID válido.' })
  userId: string;

  @IsArray({ message: 'Se espera que products sea un array.' })
  @ArrayMinSize(1, {
    message: 'El array products debe contener al menos un elemento.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
