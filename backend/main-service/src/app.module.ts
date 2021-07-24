import { Module } from '@nestjs/common';
import {
  Connection,
  ConnectionManager,
  getConnection,
  Repository,
} from 'typeorm';
import { AnswerService } from './services/Answer.service';
import { AnswerController } from './controllers/Answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './services/Question.service';
import { QuestionController } from './controllers/Question.controller';
import { QuizController } from './controllers/Quiz.controller';
import { QuizService } from './services/Quiz.service';
import { Config, ConfigOptions } from './Config';
import { Answer } from './models/Answer';
import { Question } from './models/Question';
import { Quiz } from './models/Quiz';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ConfigOptions.db,
      entities: [Answer, Question, Quiz],
    }),
  ],
  controllers: [AnswerController, QuestionController, QuizController],
  providers: [AnswerService, QuestionService, QuizService],
})
export class AppModule {}
