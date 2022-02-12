import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRequestDto } from './dto/cats.request-dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {

    constructor(private readonly catsRepository : CatsRepository){}

    async signUp(body : CatsRequestDto) {

        const {email, name, password} = body;
        const isCatExist = await this.catsRepository.existByEmail(email);

        if(isCatExist) {
            throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다!');  // 403 에러
        }
        // 암호화, 복호화 - bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const cat = await this.catsRepository.create({
            email,
            name,
            password : hashedPassword,
        });

        // 서비스단에서 virtual field 리턴
        return cat.readOnlyData;
    }
}
