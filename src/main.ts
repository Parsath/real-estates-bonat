import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './doc/swagger';
import helmet from 'helmet';
import { ValidationFilter } from './common/exceptions/filter.validation';
import { validationPipe } from './common/exceptions/error.validation';
import { NotFoundExceptionFilter } from './common/exceptions/entity-no-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());

  /*_________EXCEPTION_FILTERS___________*/
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(validationPipe);
  /*_________Swagger_Config___________*/
  SwaggerModule.setup('doc', app, createDocument(app));

  await app.listen(appConfig.port);
}
bootstrap();
