import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { QuizService } from '../services/Quiz.service';
import { Quiz } from '../models/Quiz';
import { Response } from 'express';
import { Api } from "./Api";
import { ForbiddenError, NotFoundError } from "./Errors";

export interface QuizBody {
    name: string;
    description: string;
}

@Controller()
export class QuizController {
    constructor(private quizService: QuizService) {
    }

    @Post('api/quiz')
    async createQuiz(@Body() body: QuizBody, @Res() response: Response) {

        return await Api.handleRequest(response, async () => {
            const newQuiz = await this.quizService.createQuiz(body);
            return response.status(200).send(newQuiz)
        })
    }

    @Get('api/quiz/:id')
    async getQuizById(@Param('id') id: number, @Res() response: Response) {

        return await Api.handleRequest(response, async () => {
            const quiz = await this.quizService.getQuizById(id);
            if (!quiz)
                throw new NotFoundError(`There is no quiz with id: ${id}`)

            return response.status(200).send(quiz)
        })

    }
}
