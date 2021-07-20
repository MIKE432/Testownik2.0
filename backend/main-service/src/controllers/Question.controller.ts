import {Body, Controller, Post} from "@nestjs/common";
import {QuestionService} from "../services/Question.service";
import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Answer} from "../models/Answer";
import {QuestionType} from "../models/Question";

export interface QuestionBody {
    question: string,
    abbr: string,
    questionType: QuestionType,
    quizId: number
}

@Controller()
export class QuestionController {
    constructor(
        private questionService: QuestionService
    ) {}

    @Post('api/question')
    async createQuestion(@Body() body: QuestionBody) {
        return await this.questionService.createQuestion(body)
    }
}