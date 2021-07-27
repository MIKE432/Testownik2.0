import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../models/Question';
import { QuestionService } from '../services/Question.service';
import { QuestionController } from '../controllers/Question.controller';
import { QuizModule } from './Quiz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), forwardRef(() => QuizModule)],
  exports: [QuestionService],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
