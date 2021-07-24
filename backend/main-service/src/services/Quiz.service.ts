import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import { QuizBody } from '../controllers/Quiz.controller';

@Injectable()
export class QuizService {
  private quizRepository: Repository<Quiz>;

  constructor(private connection: Connection) {
    this.quizRepository = connection.getRepository(Quiz);
  }

  async createQuiz(quizBody: QuizBody): Promise<Quiz | undefined> {
    return await this.quizRepository.save(Quiz.toEntity(quizBody));
  }

  async getQuizById(quizId: number): Promise<Quiz | undefined> {
    return await this.quizRepository.findOne({
      where: { quizId },
      relations: ['questions']
    });
  }
}
