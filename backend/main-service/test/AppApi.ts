import axios, { AxiosResponse } from 'axios';
import { UrlManager } from '../src/Config';
import { Injectable } from '@nestjs/common';
import { QuizBody } from '../src/controllers/Quiz.controller';
import { QuestionBody } from '../src/controllers/Question.controller';
import { AnswerBody } from '../src/controllers/Answer.controller';

@Injectable()
export class AppApi {
  private readonly urlManager = new UrlManager();

  async getQuiz(quizId: number): Promise<AxiosResponse> {
    return await axios.get(this.urlManager.getQuizEndpointUrl(quizId));
  }

  async postQuiz(quizBody: QuizBody): Promise<AxiosResponse> {
    return await axios.post(this.urlManager.getQuizEndpointUrl(), quizBody);
  }

  async getQuestion(questionId: number): Promise<AxiosResponse> {
    return await axios.get(this.urlManager.getQuizEndpointUrl(questionId));
  }

  async postQuestion(questionBody: QuestionBody): Promise<AxiosResponse> {
    return await axios.post(this.urlManager.getQuizEndpointUrl(), questionBody);
  }

  async getAnswer(answerId: number): Promise<AxiosResponse> {
    return await axios.get(this.urlManager.getQuizEndpointUrl(answerId));
  }

  async postAnswer(answerBody: AnswerBody): Promise<AxiosResponse> {
    return await axios.post(this.urlManager.getQuizEndpointUrl(), answerBody);
  }

  async deleteAllQuizzes(): Promise<AxiosResponse> {
    return await axios.delete(this.urlManager.getQuizEndpointUrl());
  }
}
