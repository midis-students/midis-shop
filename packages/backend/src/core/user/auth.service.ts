import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '@/common/config/config.service';
import { Encrypter } from '@/lib/encryption';

@Injectable()
export class AuthService {
  private encrypter: Encrypter;

  constructor(
    private jwtService: JwtService,
    private configService: AppConfigService,
    @InjectRepository(User)
    private authRepository: Repository<User>
  ) {
    this.encrypter = new Encrypter(this.configService.secretKey);
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('пользователь с такой почтой не найден');
    }

    if (loginDto.password !== this.decrypt(user.password)) {
      throw new ForbiddenException('не правильный пароль');
    }

    return {
      access_token: await this.jwtService.signAsync({
        user_id: user.id,
      }),
    };
  }

  async register(dto: LoginDto) {
    let user = await this.authRepository.findOne({
      where: { email: dto.email },
    });
    if (user)
      throw new ForbiddenException(
        'пользователь с такой почтой уже существует'
      );

    user = this.authRepository.create({
      email: dto.email,
      password: this.encrypt(dto.password),
    });

    await this.authRepository.save(user);

    return {
      access_token: await this.jwtService.signAsync({
        user_id: user.id,
      }),
    };
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(id: number) {
    return this.authRepository.findOne({ where: { id } });
  }

  private encrypt(password: string) {
    return this.encrypter.encrypt(password);
  }

  private decrypt(password: string) {
    return this.encrypter.dencrypt(password);
  }
}
