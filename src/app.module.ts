import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service.js';
import { CreateAccountController } from './controllers/create-acount.controller.js';
import { envSchema } from './env.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthenticateController } from './controllers/authenticate-controller.js';
import { CreateQuestionController } from './controllers/create-questions.controller.js';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController
  ],
  providers: [PrismaService],
})
export class AppModule {}
