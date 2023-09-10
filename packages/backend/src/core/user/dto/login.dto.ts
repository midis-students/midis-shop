import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'не правильная почта' })
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, {
    message: 'пароль должен быть больше 6 и меньше 16 символов',
  })
  password: string;
}
