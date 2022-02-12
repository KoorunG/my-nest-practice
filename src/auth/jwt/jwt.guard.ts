import { Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt'){ // strategy를 자동으로 실행해주는 기능

}