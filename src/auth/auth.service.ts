import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async login(email: string, password: string) {
    const user = await this.db.user.findUnique({ where: { email } });

    if (user === null) {
      throw new NotFoundException(`User with email '${email}' does not exist`);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    return { accessToken: this.jwtService.sign({ sub: user.id }) };
  }
}
