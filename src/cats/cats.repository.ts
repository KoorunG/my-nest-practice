import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatsRequestDto } from './dto/cats.request-dto';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name)
    private readonly catModel: Model<Cat>,
  ) {}

  async existByEmail(email: string) {
    const result = await this.catModel.exists({email});
    return result;
  } 

  async create(cat : CatsRequestDto) : Promise<Cat> {
      return await this.catModel.create(cat);
  }

  async findCatByEmail(email : string) : Promise<Cat | null>{
      const cat = await this.catModel.findOne({ email });
      return cat;
  }

  async findCatByIdWithoutPassword(catId : string | Types.ObjectId) : Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');  // select를 이용하여 원하는 필드만 선택적으로 가져올 수 있음
                                                              // -password : 패스워드를 제외한 나머지 필드를 가져오겠다는 뜻
    return cat;                                                         
  }
}
