import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: 'имя не должна быть пустой' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'описание не должна быть пустой' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'цена не должна быть пустой' })
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty({ message: 'изображение не должна быть пустой' })
  @IsString()
  image: string;
}
