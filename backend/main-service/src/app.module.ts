import { AppApi } from '../test/AppApi';

require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from './Config';
import { Answer } from './models/Answer';
import { Question } from './models/Question';
import { Quiz } from './models/Quiz';
import { QuizModule } from './modules/Quiz.module';
import { QuestionModule } from './modules/Question.module';
import { AnswerModule } from './modules/Answer.module';

const appApi = new AppApi();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configOptions().db,
      entities: [Answer, Question, Quiz]
    }),
    QuizModule,
    QuestionModule,
    AnswerModule
  ],
  providers: [
    {
      provide: AppApi,
      useValue: appApi
    }
  ]
})
export class AppModule {}
