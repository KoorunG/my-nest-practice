import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI, {
      }),
    AuthModule,
    ], 
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  // MODE를 확인하여 'dev' (개발용) 일 경우 true를, 아니면 false를 반환
  private readonly isDev : boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);    // 콘솔에 Mongoose 쿼리 남기기
  }

}
