import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('🌸 Simple Storage dApp API 🌸')
    .setDescription('Tugas day 4 - Dwi Kurniasih - 241011450655')
    .setVersion('1.0')
    .addTag('Simple Storage')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, document, {
    customSiteTitle: 'Pinky Backend API',
    customCss: `
      .swagger-ui .topbar { 
        background-color: #ff69b4;
        border-bottom: 3px solid #ff1493;
      }
      
      .swagger-ui .btn.authorize {
        border-color: #ff69b4;
        color: #ff69b4;
        background-color: white;
      }
      .swagger-ui .btn.authorize svg {
        fill: #ff69b4;
      }

      .swagger-ui .opblock.opblock-get {
        background: #fff0f5;
        border-color: #ff69b4;
      }
      .swagger-ui .opblock.opblock-get .opblock-summary-method {
        background: #ff69b4;
      }

      .swagger-ui .opblock.opblock-get .opblock-summary {
        border-color: #ff69b4;
      }

      .swagger-ui .info .title {
        color: #db7093;
      }
    `,
  });

  await app.listen(3000);
}
void bootstrap();
