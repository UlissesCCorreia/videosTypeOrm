import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { compareSync as bcryptCompareSync, hashSync } from 'bcrypt';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = 3600;
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUsername(username);

    const passComp = password == foundUser.password;

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException(
        `${bcryptCompareSync(password, foundUser.password)}. password = ${password} e found = ${foundUser.password} e ${passComp}`,
      );
    }

    console.log(password);
    console.log(bcryptCompareSync(password, foundUser.password));

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
