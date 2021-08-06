import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import { QuestionService } from '../services/Question.service';
import { Question, QuestionType } from '../models/Question';
import { Response } from 'express';
import { Api, HttpCodes } from './Api';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

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

export class ChangeQuestionOptions {
  @ApiProperty()
  question?: string;

  @ApiProperty()
  abbr?: string;

  @ApiProperty()
  questionType?: QuestionType;
}

@ApiTags('Question')
@Controller()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('api/question')
  @ApiBody({
    description: 'New question',
    type: QuestionBody
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
        }
      );
    });
  }

  @Get('api/question/:id')
  @ApiResponse({
    description: 'New question',
    type: Question
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
        }
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
        }
      );
      return;
    });
  }

  @Put('api/quiz/:id')
  @ApiResponse({
    description: 'Change question',
    type: ChangeQuestionOptions
  })
  async changeQuestionById(
    @Param('id') id: number,
    @Body() changeQuizBody: ChangeQuestionOptions,
    @Res() response: Response
  ) {
    return await Api.handleRequest(response, async () => {
      const updated = await this.questionService.updateQuestionById(
        id,
        changeQuizBody
      );

      updated.handle(
        (result) => {
          response.status(HttpCodes.OK_CODE).send(result);
        },
        (error) => {
          response.status(error.code).send(error);
        }
      );
    });
  }
}
