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

export interface AnswerBody {
  text: string;
  abbr: string;
  isCorrect: boolean;
  questionId: number;
}

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
