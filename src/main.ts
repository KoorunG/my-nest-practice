import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(['/docs', '/docs-json'], expressBasicAuth({
    challenge : true,
    users : {
      [process.env.SWAGGER_USER] : process.env.SWAGGER_PASSWORD,  
    }
  }));

  // ################# SWAGGER ################# //
  const config = new DocumentBuilder()
  .setTitle('C.I.C')
  .setDescription('cat')
  .setVersion('1.0.0')
  .build();

  const document : OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);         // swagger api의 endpoint를 지정하는 것
  // ########################################### //


  // ################# CORS ################# //
  app.enableCors({
    origin : true,        // true로 설정하면 모든 url에서 접근이 가능 (개발단계일때 true로 설정하고 배포단계에서는 해당 url을 작성해주자)
    credentials : true,
  })
  // ######################################## //
  await app.listen(process.env.PORT);
  
  console.log(`listening on port ${process.env.PORT}`);
}
bootstrap();
