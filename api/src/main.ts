import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import AppModule from './app.module';
// eslint-disable-next-line import/extensions
import CustomLogger from './shared/logger';
// import TransformInterceptor from './shared/transform.interceptor';
// import { resolve } from 'path'
// import { config } from 'dotenv'

declare const module: any;

async function bootstrap() {
  const logger = new CustomLogger();

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // app.useGlobalInterceptors(new TransformInterceptor());

  // config({ path: resolve(__dirname, '../.env') })
  // console.log(process.env.PORT)
  // const options = new DocumentBuilder()
  //   .setTitle('Foodapp Api')
  //   .setDescription('The Foodapp API Documents')
  //   .setBasePath('api/v1')
  //   .addBearerAuth()
  //   .setVersion('1.0.0')
  //   .build()

  // const document = SwaggerModule.createDocument(app, options)
  // SwaggerModule.setup('docs', app, document)

  const port = 4000;
  await app.listen(port);
  logger.debug(`Server running on http://localhost:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
