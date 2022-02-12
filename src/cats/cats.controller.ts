import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { CatsRequestDto } from './dto/cats.request-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login-request.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from './cats.schema';

@Controller('cats')
// @UseInterceptors(SuccessInterceptor)    // 의존성 주입  
@UseFilters(HttpExceptionFilter)        // 의존성 주입
export class CatsController {
    constructor(
        private readonly catsService : CatsService,      // 이 클래스에서만 사용할 것이므로 private readonly로 처리함
        private readonly authService : AuthService,
    ){}

    @Get()
    @ApiOperation({summary : '현재 고양이 정보 가져오기'})
    @ApiResponse({status : 500, description : 'Internal Server Error...'})
    @ApiResponse({status : 200, description : 'Success!', type : ReadOnlyCatDto})
    @UseGuards(JwtGuard)
    getCurrentCat(@CurrentUser() cat : Cat) {
        return cat.readOnlyData;
    }

    @Post()
    @ApiOperation({summary : '회원가입'})
    @ApiResponse({status : 500, description : 'Internal Server Error...'})
    @ApiResponse({status : 200, description : 'Success!', type : ReadOnlyCatDto})
    async signUp(@Body() body : CatsRequestDto) {
        return await this.catsService.signUp(body);
    }

    @Post('login')
    @ApiOperation({summary : '로그인'})
    @ApiResponse({status : 500, description : 'Internal Server Error...'})
    @ApiResponse({status : 200, description : 'Success!'})
    login(@Body() data : LoginRequestDto) {
        return this.authService.jwtLogin(data);
    }

    // 프론트쪽에서 JWT토큰을 제거하면 로그아웃 처리가 되기 때문에 구현할 필요가 없음!

    // logout() {
    //     return 'logout';
    // }

    uploadCatImg() {
        return 'uploadImg';
    }
}
