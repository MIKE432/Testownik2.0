require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, configOptions } from './Config';
import { Answer } from './models/Answer';
import { Question } from './models/Question';
import { Quiz } from './models/Quiz';
import { QuizModule } from './modules/Quiz.module';
import { QuestionModule } from './modules/Question.module';
import { AnswerModule } from './modules/Answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configOptions().db,
      entities: [Answer, Question, Quiz],
    }),
    QuizModule,
    QuestionModule,
    AnswerModule,
  ],
})
export class AppModule {}
