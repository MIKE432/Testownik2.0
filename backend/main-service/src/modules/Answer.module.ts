import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../models/Answer';
import { AnswerService } from '../services/Answer.service';
import { AnswerController } from '../controllers/Answer.controller';
import { QuestionModule } from './Question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionModule],
  exports: [AnswerService],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
