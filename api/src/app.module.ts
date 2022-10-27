import { Module, NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        if (!config['AUTH']) {
          throw new NotFoundException(
            'Configuration error. AUTH not found. Please add the env variable AUTH.',
          );
        }
        return config;
      },
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
