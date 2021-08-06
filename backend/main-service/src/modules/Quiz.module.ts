import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../models/Quiz';
import { QuizService } from '../services/Quiz.service';
import { QuizController } from '../controllers/Quiz.controller';
import { QuestionModule } from './Question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), forwardRef(() => QuestionModule)],
  exports: [QuizService],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
