
// 커스텀 파이프를 만들어보자

import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {

    transform(value: number) {

        if(value < 0){
            throw new HttpException('value must be > 0', 400);
        }

        if(value % 10 != 0) {
            throw new HttpException('value must be numeric!', 400);
        }
        
        return value;
    }

}