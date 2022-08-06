/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: environment.TOKEN_KEY || 'justalittlesecret',
    });
    // console.log('Token: ', this.jwtFromRequest);
  }
  async validate(payload: any) {
    try {
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException(
          'You are not authorized to access the requested resource',
        );
      } else {
        // console.log('User Found: ', user);
      }

      const { password, ...result } = user;
      return result ? result : null;
    } catch (err) {
      console.log('Error in jwt..: ', err.message);
    }
  }
}
