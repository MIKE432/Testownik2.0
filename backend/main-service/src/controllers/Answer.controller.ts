import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerService } from '../services/Answer.service';
import { Answer } from '../models/Answer';
import { Column, ManyToOne } from 'typeorm';
import { Question } from '../models/Question';

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
  async getAnswerById(@Param('id') id: number): Promise<Answer | undefined> {
    return await this.answerService.getAnswerById(id);
  }

  @Post('api/answer')
  async createAnswer(
    @Body() body: AnswerBody,
  ): Promise<Answer | undefined> {
    return await this.answerService.createAnswer(body);
  }
}
