import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { CustomLogger } from './shared/logger'
// import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new CustomLogger()

  const app = await NestFactory.create(AppModule, {
    logger: logger,
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
  logger.debug(`Server running on http://localhost:${port}`)
}
bootstrap()
