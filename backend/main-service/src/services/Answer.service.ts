import { Inject, Injectable } from '@nestjs/common';
import { Column, Connection, getConnection, Repository } from 'typeorm';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { AnswerBody } from '../controllers/Answer.controller';
import { QuestionService } from './Question.service';

export interface ChangeAnswerOptions {
    text?: string;
    abbr?: string;
    isCorrect?: boolean;
}

@Injectable()
export class AnswerService {
    private answerRepository: Repository<Answer>;

    constructor(
        private connection: Connection,
        private questionService: QuestionService,
    ) {
        this.answerRepository = connection.getRepository(Answer);
    }

    async getAnswerById(answerId: number): Promise<Answer | undefined> {
        return await this.answerRepository.findOne({ answerId });
    }

    async createAnswer(
        answerBody: AnswerBody,
    ): Promise<Answer | undefined> {
        const question = await this.questionService.getQuestionById(
            answerBody.questionId,
        );
        if (!question) return;

        return await this.answerRepository.save(Answer.toEntity(answerBody, question));
    }

    async changeAnswer(
        answerId: number,
        changeAnswerOptions: ChangeAnswerOptions,
    ): Promise<boolean> {
        const currentAnswer = await this.answerRepository.findOne({ answerId });
        if (!currentAnswer) return false;
        applyAnswerChanges(currentAnswer, changeAnswerOptions);

        await this.answerRepository.save(currentAnswer);
        return true;
    }

    async getAnswerByQuestionId(ids: number[]): Promise<Answer[] | undefined> {
        return await this.answerRepository.findByIds(ids);
    }
}

const applyAnswerChanges = (
    answer: Answer,
    answerChanges: ChangeAnswerOptions,
) => {
    answer.text = answerChanges.text ?? answer?.text;
    answer.isCorrect = answerChanges.isCorrect ?? answer?.isCorrect;
    answer.abbr = answerChanges.abbr ?? answer?.abbr;
};
