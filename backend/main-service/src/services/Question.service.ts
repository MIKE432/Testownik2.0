import {Injectable} from "@nestjs/common";
import {Question} from "../models/Question";
import {Connection, Repository} from "typeorm";
import {QuestionBody} from "../controllers/Question.controller";
import {QuizService} from "./Quiz.service";

@Injectable()
export class QuestionService {

    private questionRepository: Repository<Question>

    constructor(
        private connection: Connection,
        private quizService: QuizService) {
        this.questionRepository = connection.getRepository(Question)
    }

    async getQuestionById(questionId: number): Promise<Question | undefined> {
        return await this.questionRepository.findOne({questionId})
    }

    async createQuestion(questionBody: QuestionBody): Promise<Question | undefined> {
        const quiz = await this.quizService.getQuizById(questionBody.quizId)

        if (!quiz)
            return

        const question = new Question()
        question.question = questionBody.question
        question.questionType = questionBody.questionType
        question.abbr = questionBody.abbr
        question.quiz = quiz

        return await this.questionRepository.save(question)
    }
}