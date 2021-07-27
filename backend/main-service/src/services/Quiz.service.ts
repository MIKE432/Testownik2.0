import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import { QuizBody } from '../controllers/Quiz.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../models/Question';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async createQuiz(quizBody: QuizBody): Promise<Quiz | undefined> {
    return await this.quizRepository.save(Quiz.toEntity(quizBody));
  }

  async getQuizById(quizId: number): Promise<Quiz | undefined> {
    return await this.quizRepository.findOne({
      where: { quizId },
      relations: ['questions'],
    });
  }

  async deleteQuizById(quizId: number): Promise<boolean> {
    const deleteResult = await this.quizRepository.delete({ quizId });
    return !!deleteResult.affected;
  }
}
