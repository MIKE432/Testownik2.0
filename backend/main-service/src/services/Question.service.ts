import { Injectable } from '@nestjs/common';
import { Question } from '../models/Question';
import { Connection, Repository } from 'typeorm';
import { QuestionBody } from '../controllers/Question.controller';
import { QuizService } from './Quiz.service';
import { InjectRepository } from '@nestjs/typeorm';
import { error, ok, resolver, Result } from '../Result';
import { NotFoundError } from '../controllers/Errors';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private quizService: QuizService,
  ) {}

  async getQuestionById(questionId: number): Promise<Result<Question>> {
    const result = await this.questionRepository.findOne({
      where: { questionId },
      relations: ['answers'],
    });

    return resolver(
      () => !!result,
      result!,
      new NotFoundError(`Cannot find question with id: ${questionId}`),
    );
  }

  async createQuestion(questionBody: QuestionBody): Promise<Result<Question>> {
    const quiz = await this.quizService.getQuizById(questionBody.quizId);

    if (quiz.isOk()) {
      return ok(
        await this.questionRepository.save(
          Question.toEntity(questionBody, quiz.data!),
        ),
      );
    }

    return error(
      new NotFoundError(`Cannot find quiz with id: ${questionBody.quizId}`),
    );
  }

  async deleteQuestionById(questionId: number): Promise<Result<boolean>> {
    const deleteResult = await this.questionRepository.delete({ questionId });
    return ok(!!deleteResult.affected);
  }
}
