import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AnswerService } from '../services/Answer.service';
import { Answer } from '../models/Answer';
import { Column, ManyToOne } from 'typeorm';
import { Question } from '../models/Question';
import { response, Response } from 'express';
import { Api, HttpCodes } from './Api';
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";

export class AnswerBody {
  @ApiProperty()
  text!: string;

  @ApiProperty()
  abbr!: string;

  @ApiProperty()
  isCorrect!: boolean;

  @ApiProperty()
  questionId!: number;
}

export class ChangeAnswerOptions {
  @ApiProperty()
  text?: string;

  @ApiProperty()
  abbr?: string;

  @ApiProperty()
  isCorrect?: boolean;
}

@ApiTags('Answer')
@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('api/answer/:id')
  async getAnswerById(@Param('id') id: number, @Res() response: Response) {
    return Api.handleRequest(response, async () => {
      const answer = await this.answerService.getAnswerById(id);
      return response.status(HttpCodes.OK_CODE).send(answer);
    });
  }

  @Post('api/answer')
  @ApiBody({
    description: 'New answer',
    type: AnswerBody
  })
  async createAnswer(@Body() body: AnswerBody, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const createdAnswer = await this.answerService.createAnswer(body);
      return response.status(HttpCodes.OK_CODE).send(createdAnswer);
    });
  }

  @Delete('api/answer/:id')
  async deleteAnswerById(@Param('id') id: number, @Res() response: Response) {
    return await Api.handleRequest(response, async () => {
      const deleted = await this.answerService.deleteAnswerById(id);
      return response.status(HttpCodes.NO_CONTENT_CODE).send(deleted);
    });
  }
}
