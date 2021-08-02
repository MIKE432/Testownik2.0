import { Repository } from 'typeorm';
import { Question } from '../models/Question';
import { AnswerService } from './Answer.service';
import { QuestionService } from './Question.service';
import { Answer } from '../models/Answer';
import { anything, deepEqual, instance, mock, when } from 'ts-mockito';
import { Quiz } from '../models/Quiz';
import {
  AnswerBody,
  ChangeAnswerOptions
} from '../controllers/Answer.controller';
import { ok, error } from '../../dist/src/Result';
import { NotFoundError } from '../controllers/Errors';

const answerBody: AnswerBody = {
  text: 'To jest miejsce na pytanie',
  isCorrect: true,
  abbr: '1',
  questionId: 1
};

const mockedQuiz: Quiz = {
  quizId: 1,
  questions: [],
  description: 'sadsa',
  name: 'asd'
};

const mockedQuestion: Question = {
  quiz: mockedQuiz,
  abbr: 'asd',
  question: 'da s',
  questionType: 1,
  questionId: 1,
  answers: []
};

const mockedAnswer: Answer = {
  answerId: 1,
  isCorrect: answerBody.isCorrect,
  abbr: answerBody.abbr,
  text: answerBody.text,
  question: mockedQuestion
};

const mockedChangeAnswerOptions: ChangeAnswerOptions = {
  text: 'asd',
  isCorrect: false
};

describe('AnswerService', () => {
  let questionService: QuestionService;
  let answerService: AnswerService;
  let answerRepository: Repository<Answer>;

  beforeEach(() => {
    questionService = mock(QuestionService);
    answerRepository = mock(Repository);
    answerService = new AnswerService(
      instance(answerRepository),
      instance(questionService)
    );
    when(questionService.getQuestionById(anything())).thenResolve(
      ok(mockedQuestion)
    );
  });

  it('should add new answer', async function () {
    when(
      answerRepository.save(
        deepEqual(Answer.toEntity(answerBody, mockedQuestion))
      )
    ).thenResolve(mockedAnswer);

    const result = await answerService.createAnswer(answerBody);

    expect(result).toEqual(ok(mockedAnswer));
  });

  it('should get an answer', async function () {
    when(answerRepository.findOne(deepEqual({ answerId: 1 }))).thenResolve(
      mockedAnswer
    );
    const result = await answerService.getAnswerById(1);

    expect(result).toEqual(ok(mockedAnswer));
  });

  it('should change current answer', async () => {
    when(answerRepository.findOne(deepEqual({ answerId: 10 }))).thenResolve(
      mockedAnswer
    );
    when(
      answerRepository.update(
        deepEqual({ answerId: 10 }),
        deepEqual(mockedChangeAnswerOptions)
      )
    ).thenResolve({
      raw: {},
      affected: 1,
      generatedMaps: []
    });

    const result = await answerService.changeAnswer(
      10,
      mockedChangeAnswerOptions
    );

    expect(result).toEqual(ok(true));
  });

  it('should not change answer', async () => {
    when(answerRepository.findOne(deepEqual({ answerId: 10 }))).thenResolve(
      undefined
    );
    when(
      answerRepository.update(
        deepEqual({ answerId: 10 }),
        deepEqual(mockedChangeAnswerOptions)
      )
    ).thenResolve({
      raw: {},
      affected: 1,
      generatedMaps: []
    });

    const result = await answerService.changeAnswer(
      10,
      mockedChangeAnswerOptions
    );

    expect(result).toEqual(
      error(new NotFoundError(`Cannot find answer with id: 10`))
    );
  });

  it('should delete an answer', async () => {
    when(answerRepository.delete(deepEqual({ answerId: 10 }))).thenResolve({
      raw: {},
      affected: 1
    });

    const result = await answerService.deleteAnswerById(10);
    expect(result).toEqual(ok(true));
  });

  it('should not delete an answer', async () => {
    when(answerRepository.delete(deepEqual({ answerId: 10 }))).thenResolve({
      raw: {},
      affected: 0
    });

    const result = await answerService.deleteAnswerById(10);
    expect(result).toEqual(
      error(new NotFoundError(`There is on answer to delete with id: 10`))
    );
  });
});
