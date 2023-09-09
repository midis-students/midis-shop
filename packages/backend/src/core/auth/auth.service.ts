import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '@/lib/encrypter';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '@/common/config/config.service';
import { Role } from '@/core/auth/auth.enum';

@Injectable()
export class AuthService {
  private encrypter: Encrypter;

  constructor(
    private jwtService: JwtService,
    private configService: AppConfigService,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>
  ) {
    this.encrypter = new Encrypter(configService.secretKey);
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('user not found');
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
    if (user) throw new ForbiddenException('email already exists');

    user = this.authRepository.create({
      email: dto.email,
      password: this.encrypt(dto.password),
    });

    await this.authRepository.save(user);

    return user;
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(id: number) {
    return this.authRepository.findOne({ where: { id } });
  }

  private encrypt(password: string) {
    return password;
  }

  private decrypt(password: string) {
    return password;
  }
}
