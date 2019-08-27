import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger } from './shared/logger'
// import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  })

  const port = process.env.PORT || 3000

  const options = new DocumentBuilder()
    .setTitle('Foodapp Api')
    .setDescription('The Foodapp API Documents')
    .setBasePath('api/v1')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  // Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap()
