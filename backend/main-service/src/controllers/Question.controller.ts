import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { QuestionService } from '../services/Question.service';
import { QuestionType } from '../models/Question';
import { Response } from 'express';
import { Api, HttpCodes } from './Api';
import { NotFoundError } from './Errors';

export interface QuestionBody {
  question: string;
  abbr: string;
  questionType: QuestionType;
  quizId: number;
}

@Controller()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('api/question')
  async createQuestion(@Body() body: QuestionBody, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const createdQuestion = await this.questionService.createQuestion(body);
      return response.status(HttpCodes.OK_CODE).send(createdQuestion);
    });
  }

  @Get('api/question/:id')
  async getQuestionById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const question = await this.questionService.getQuestionById(id);

      if (!question)
        throw new NotFoundError(`There is no question with id: ${id}`);

      return response.status(HttpCodes.OK_CODE).send(question);
    });
  }

  @Delete('api/question/:id')
  async deleteQuestionById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const deleted = await this.questionService.deleteQuestionById(id);
      return response.status(HttpCodes.NO_CONTENT_CODE).send();
    });
  }
}
