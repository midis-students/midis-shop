import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
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
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>
  ) {
    this.encrypter = new Encrypter(this.configService.secretKey);
  }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (loginDto.password !== this.decrypt(user.password)) {
      throw new ForbiddenException('password incorrect');
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
    return this.encrypter.encrypt(password);
  }

  private decrypt(password: string) {
    return this.encrypter.dencrypt(password);
  }
}
