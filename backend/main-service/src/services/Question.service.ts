import { Injectable } from '@nestjs/common';
import { Question } from '../models/Question';
import { Connection, Repository } from 'typeorm';
import { QuestionBody } from '../controllers/Question.controller';
import { QuizService } from './Quiz.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private quizService: QuizService,
  ) {}

  async getQuestionById(questionId: number): Promise<Question | undefined> {
    return await this.questionRepository.findOne({
      where: { questionId },
      relations: ['answers'],
    });
  }

  async createQuestion(
    questionBody: QuestionBody,
  ): Promise<Question | undefined> {
    const quiz = await this.quizService.getQuizById(questionBody.quizId);

    if (!quiz) return;

    return await this.questionRepository.save(
      Question.toEntity(questionBody, quiz),
    );
  }

  async deleteQuestionById(questionId: number): Promise<boolean> {
    const deleteResult = await this.questionRepository.delete({ questionId });
    return !!deleteResult.affected;
  }
}
