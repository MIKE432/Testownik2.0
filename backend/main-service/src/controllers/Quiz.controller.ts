import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { QuizService } from '../services/Quiz.service';
import { Quiz } from '../models/Quiz';
import { Response } from 'express';
import { Api, HttpCodes } from './Api';
import { ErrorBody, NotFoundError } from './Errors';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

export class QuizBody {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;
}

export class ChangeQuizOptions {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;
}

@ApiTags('Quiz')
@Controller()
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('api/quiz')
  @ApiBody({
    description: 'New quiz',
    type: QuizBody,
  })
  async createQuiz(@Body() body: QuizBody, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const newQuiz = await this.quizService.createQuiz(body);

      newQuiz.handle(
        (result) => {
          response.status(HttpCodes.CREATED_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }

  @Get('api/quiz/:id')
  async getQuizById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const quiz = await this.quizService.getQuizById(id);

      quiz.handle(
        (result) => {
          response.status(HttpCodes.OK_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }

  @Delete('api/quiz/:id')
  async deleteQuizById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const deleted = await this.quizService.deleteQuizById(id);
      deleted.handle(
        (result) => {
          response.status(HttpCodes.NO_CONTENT_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }

  @Put('api/quiz/:id')
  async changeQuizById(
    @Param('id') id: number,
    @Body() changeQuizBody: ChangeQuizOptions,
    @Res() response: Response,
  ) {
    return await Api.handleRequest(response, async () => {
      const updated = await this.quizService.updateQuizById(id, changeQuizBody);

      updated.handle(
        (result) => {
          response.status(HttpCodes.OK_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        },
      );
    });
  }
}
