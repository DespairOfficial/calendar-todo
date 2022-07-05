import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Calendar app API')
        .setDescription('Simple calendar API on nestJs with express')
        .setVersion('1.0.1')
        .addTag('APP')
        .build()
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api/docs', app, swaggerDocument)

    const PORT = process.env.PORT || 5001
    await app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
}
bootstrap()
