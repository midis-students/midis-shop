import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '@/lib/encryption/encrypter';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from '@/common/config/config.service';

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
    let user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      user = this.authRepository.create({
        email: loginDto.email,
        password: this.encrypter.encrypt(loginDto.password),
      });

      await this.authRepository.save(user);
    }

    return {
      access_token: await this.jwtService.signAsync({
        /* Переделать как в auth.guard */
        user_id: session.user_id,
        time: session.time,
      }),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
