import {Injectable} from "@nestjs/common";
import {Connection, Repository} from "typeorm";
import {Quiz} from "../models/Quiz";
import {QuizBody} from "../controllers/Quiz.controller";

@Injectable()
export class QuizService {
    private quizRepository: Repository<Quiz>

    constructor(
        private connection: Connection
    ) {
        this.quizRepository = connection.getRepository(Quiz)
    }

    async createQuiz(quizBody: QuizBody): Promise<Quiz | undefined> {
        const quiz = new Quiz()
        quiz.name = quizBody.name
        quiz.description = quizBody.description
        quiz.questions = []

        return await this.quizRepository.save(quiz)
    }

    async getQuizById(quizId: number): Promise<Quiz | undefined> {
        return await this.quizRepository.findOne({where: {quizId}, relations: ['questions']})
    }
}