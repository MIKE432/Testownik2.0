import { QuestionService } from './Question.service';
import { QuizService } from './Quiz.service';
import { anything, deepEqual, instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import {
  ChangeQuestionOptions,
  QuestionBody
} from '../controllers/Question.controller';
import { Question } from '../models/Question';
import spyOn = jest.spyOn;
import { error, ok } from '../Result';
import { NotFoundError } from '../controllers/Errors';

const mockedQuiz: Quiz = {
  quizId: 1,
  questions: [],
  description: 'Test sprawdzający czy serio jestem fajny',
  name: 'Sprawdz czy jesteś fajny!'
};

const questionBody: QuestionBody = {
  question: 'Serio myślisz ze jesteś fajny?',
  abbr: '1',
  questionType: 1,
  quizId: 1
};

const changeQuestionOptions: ChangeQuestionOptions = {
  question: 'Qsad',
  questionType: 1,
  abbr: '1'
};

const mockedQuestion: Question = {
  question: questionBody.question,
  questionType: questionBody.questionType,
  quiz: mockedQuiz,
  abbr: questionBody.abbr,
  answers: []
};

describe('QuestionService', () => {
  let questionService: QuestionService;
  let quizService: QuizService;
  let questionRepository: Repository<Question>;

  beforeEach(() => {
    quizService = mock(QuizService);
    questionRepository = mock(Repository);
    questionService = new QuestionService(
      instance(questionRepository),
      instance(quizService)
    );
    when(quizService.getQuizById(anything())).thenResolve(ok(mockedQuiz));
  });

  it('should add a question to a quiz', async () => {
    when(
      questionRepository.save(
        deepEqual(Question.toEntity(questionBody, mockedQuiz))
      )
    ).thenResolve(mockedQuestion);
    const result = await questionService.createQuestion(questionBody);

    expect(result).toEqual(ok(mockedQuestion));
  });

  it('should get a question', async () => {
    const questionId = 1;
    when(
      questionRepository.findOne(
        deepEqual({ where: { questionId }, relations: ['answers'] })
      )
    ).thenResolve(mockedQuestion);

    const result = await questionService.getQuestionById(questionId);
    expect(result).toEqual(ok(mockedQuestion));
  });

  it('should return undefined and add nothing if there is no such quiz', async () => {
    const questionId = 1;
    const save = spyOn(questionRepository, 'save');
    when(questionRepository.findOne(deepEqual({ questionId }))).thenResolve(
      undefined
    );

    const result = await questionService.getQuestionById(1);
    expect(result).toEqual(
      error(new NotFoundError(`Cannot find question with id: ${questionId}`))
    );
    expect(save).toBeCalledTimes(0);
  });

  it('should delete question', async () => {
    const questionId = 10;
    when(questionRepository.delete(deepEqual({ questionId }))).thenResolve({
      raw: {},
      affected: 1
    });

    const result = await questionService.deleteQuestionById(10);
    expect(result).toEqual(ok(true));
  });

  it('should delete question', async () => {
    const questionId = 10;
    when(questionRepository.delete(deepEqual({ questionId }))).thenResolve({
      raw: {},
      affected: 0
    });

    const result = await questionService.deleteQuestionById(10);
    expect(result).toEqual(
      error(new NotFoundError(`Cannot delete question with id: ${questionId}`))
    );
  });

  it('should change question', async () => {
    const questionId = 1;
    when(
      questionRepository.update(
        deepEqual({ questionId }),
        deepEqual(changeQuestionOptions)
      )
    ).thenResolve({
      raw: {},
      affected: 1,
      generatedMaps: []
    });
    const result = await questionService.updateQuestionById(
      questionId,
      changeQuestionOptions
    );

    expect(result).toEqual(ok(true));
  });

  it('should not update question', async () => {
    const questionId = 1;
    when(
      questionRepository.update(
        deepEqual({ questionId }),
        deepEqual(changeQuestionOptions)
      )
    ).thenResolve({
      raw: {},
      affected: 1,
      generatedMaps: []
    });
    const result = await questionService.updateQuestionById(
      questionId,
      changeQuestionOptions
    );

    expect(result).toEqual(ok(true));
  });
});
