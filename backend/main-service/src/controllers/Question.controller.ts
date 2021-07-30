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
import { Question, QuestionType } from '../models/Question';
import { Response } from 'express';
import { Api, HttpCodes } from './Api';
import { NotFoundError } from './Errors';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from '../Result';

export class QuestionBody {
  @ApiProperty()
  question!: string;

  @ApiProperty()
  abbr!: string;

  @ApiProperty()
  questionType!: QuestionType;

  @ApiProperty()
  quizId!: number;
}

@ApiTags('Question')
@Controller()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('api/question')
  @ApiBody({
    description: 'New question',
    type: QuestionBody,
  })
  async createQuestion(@Body() body: QuestionBody, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const createdQuestion = await this.questionService.createQuestion(body);

      createdQuestion.handle(
        (result) => {
          response.status(HttpCodes.OK_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }

  @Get('api/question/:id')
  @ApiResponse({
    description: 'New question',
    type: Question,
  })
  async getQuestionById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const question = await this.questionService.getQuestionById(id);

      question.handle(
        (result) => {
          response.status(HttpCodes.OK_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }

  @Delete('api/question/:id')
  async deleteQuestionById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const deleted = await this.questionService.deleteQuestionById(id);
      deleted.handle(
        (result) => {
          response.status(HttpCodes.NO_CONTENT_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
      return;
    });
  }
}
