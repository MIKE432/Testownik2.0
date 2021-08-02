import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import { ChangeQuizOptions, QuizBody } from '../controllers/Quiz.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { error, ok, resolver, Result } from '../Result';
import { InternalServerError, NotFoundError } from '../controllers/Errors';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>
  ) {}

  async createQuiz(quizBody: QuizBody): Promise<Result<Quiz | undefined>> {
    const result = await this.quizRepository.save(Quiz.toEntity(quizBody));
    if (!result) return error(new InternalServerError('Cannot add new quiz'));
    return ok(result);
  }

  async getQuizById(quizId: number): Promise<Result<Quiz>> {
    const quiz = await this.quizRepository.findOne({
      where: { quizId },
      relations: ['questions']
    });

    if (!quiz)
      return error(new NotFoundError(`Cannot find quiz with id: ${quizId}`));

    return ok(quiz);
  }

  async deleteQuizById(quizId: number): Promise<Result<boolean>> {
    const { affected } = await this.quizRepository.delete({ quizId });

    return resolver(
      () => affected !== 0,
      true,
      new NotFoundError(`Cannot delete quiz with id: ${quizId}`)
    );
  }

  async updateQuizById(
    quizId: number,
    quizOptions: ChangeQuizOptions
  ): Promise<Result<boolean>> {
    const updated = await this.quizRepository.update({ quizId }, quizOptions);
    return resolver(
      () => updated.affected !== 0,
      true,
      new NotFoundError(`Cannot change quiz with id: ${quizId}`)
    );
  }
}
