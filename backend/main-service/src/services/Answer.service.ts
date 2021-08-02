import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from '../models/Answer';
import {
  AnswerBody,
  ChangeAnswerOptions,
} from '../controllers/Answer.controller';
import { QuestionService } from './Question.service';
import { InjectRepository } from '@nestjs/typeorm';
import { error, resolver, Result } from '../Result';
import { InternalServerError, NotFoundError } from '../controllers/Errors';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private questionService: QuestionService,
  ) {}

  async getAnswerById(answerId: number): Promise<Result<Answer>> {
    const answer = await this.answerRepository.findOne({ answerId });
    return resolver(
      () => !!answer,
      answer!,
      new NotFoundError(`Cannot find answer with id: ${answerId}`),
    );
  }

  async createAnswer(answerBody: AnswerBody): Promise<Result<Answer>> {
    const question = await this.questionService.getQuestionById(
      answerBody.questionId,
    );

    if (question.isOk()) {
      const createdAnswer = await this.answerRepository.save(
        Answer.toEntity(answerBody, question.data!),
      );
      return resolver(
        () => !!createdAnswer,
        createdAnswer!,
        new InternalServerError('Cannot add new answer'),
      );
    }
    return error(new InternalServerError('Cannot add new answer'));
  }

  async changeAnswer(
    answerId: number,
    changeAnswerOptions: ChangeAnswerOptions,
  ): Promise<Result<boolean>> {
    const currentAnswer = await this.answerRepository.findOne({ answerId });

    if (!currentAnswer)
      return error(
        new NotFoundError(`Cannot find answer with id: ${answerId}`),
      );

    const { affected } = await this.answerRepository.update(
      currentAnswer,
      changeAnswerOptions,
    );

    return resolver(
      () => affected !== 0,
      true,
      new InternalServerError('Cannot update this answer'),
    );
  }

  async deleteAnswerById(answerId: number): Promise<Result<boolean>> {
    const { affected } = await this.answerRepository.delete({ answerId });

    return resolver(
      () => affected !== 0,
      true,
      new NotFoundError(`There is on answer to delete with id: ${answerId}`),
    );
  }
}
