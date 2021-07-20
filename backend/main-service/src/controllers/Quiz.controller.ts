import {Body, Controller, Get, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {QuizService} from "../services/Quiz.service";
import {Quiz} from "../models/Quiz";
import {Response} from "express";

export interface QuizBody {
    name: string,
    description: string
}

@Controller()
export class QuizController {
    constructor(
        private quizService: QuizService
    ) {}

    @Post('api/quiz')
    async createQuiz(
        @Body() body: QuizBody,
        @Res() response: Response
    ) {
        await this.quizService.createQuiz(body)
    }

    @Get('api/quiz/:id')
    async getQuizById(@Param('id') id: number): Promise<Quiz|undefined> {
        return await this.quizService.getQuizById(id)
    }
}