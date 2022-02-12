import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    // cat의 DB를 사용해야 하므로 종속성 주입
    constructor(
        private readonly catsRepository : CatsRepository,
        private readonly jwtService : JwtService,   
        // AuthModule에서 imports한 JwtModule.register({...}) 으로 등록한 것을 
        // @nestjs/jwt를 거쳐서 JwtService로 만들어 주는데 이를 종속성 주입한 것!
    ){}

    async jwtLogin(data : LoginRequestDto) {
        const { email, password } = data;

        // 고양이를 받아옴
        const cat = await this.catsRepository.findCatByEmail(email);
        if(!cat){
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
        }

        // 패스워드 일치여부 검증
        const isPasswordValidated : boolean = await bcrypt.compare(password, cat.password);

        // 패스워드가 일치하지 않는 경우
        if(!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
        }

        const payload = { email : email , sub : cat.id };    // 별로 중요하지 않은 정보를 payload로 만들어서 전달

        return {
            data :{
                token : this.jwtService.sign(payload)   // payload를 이용하여 서명한 것을 리턴
            }
        };
    }
}
