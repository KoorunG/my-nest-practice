import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports : [
    ConfigModule.forRoot(),
    PassportModule.register({defaultStrategy : 'jwt', session : false}),
    JwtModule.register({secret : process.env.JWT_SECRET, signOptions : {expiresIn : '1y'}}),
    // CatsModule,
    forwardRef(() => CatsModule),
  ],
  exports : [AuthService]
})
export class AuthModule {}
