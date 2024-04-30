import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/user/user.dto';
//import { UserFromJwt } from '../models/UserFromJwt';
//import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'umdoistres',
    });
  }

  async validate(payload: UserDto): Promise<UserDto> {
    return {
      id: payload.id,
      username: payload.username,
      password: payload.password,
    };
  }
}