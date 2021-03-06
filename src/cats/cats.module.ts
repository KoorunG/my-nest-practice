import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
    controllers : [CatsController],
    providers : [CatsService, CatsRepository],
    imports : [
        MongooseModule.forFeature([{name : Cat.name, schema : CatSchema}]),
        // AuthModule,
        forwardRef(() => AuthModule),
    ],
    exports : [CatsService, CatsRepository]
})
export class CatsModule {}
