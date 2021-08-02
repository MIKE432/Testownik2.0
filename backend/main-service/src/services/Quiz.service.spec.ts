import { QuizService } from './Quiz.service';
import { Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { ChangeQuizOptions, QuizBody } from '../controllers/Quiz.controller';
import { error, ok } from '../Result';
import { NotFoundError } from '../controllers/Errors';

const mockedQuizBody: QuizBody = {
  description: 'ads',
  name: 'asdd'
};

const mockedQuiz: Quiz = {
  quizId: 1,
  questions: [],
  description: mockedQuizBody.description,
  name: mockedQuizBody.name
};

const changeQuizOptions: ChangeQuizOptions = {
  description: 'dsa',
  name: 'ad'
};

describe('QuizService', () => {
  let quizService: QuizService;
  let quizRepository: Repository<Quiz>;

  beforeEach(() => {
    quizRepository = mock(Repository);
    quizService = new QuizService(instance(quizRepository));
  });

  it('should add new quiz', async () => {
    when(
      quizRepository.save(deepEqual(Quiz.toEntity(mockedQuizBody)))
    ).thenResolve(mockedQuiz);
    const result = await quizService.createQuiz(mockedQuizBody);

    expect(result).toEqual(ok(mockedQuiz));
  });

  it('should get quiz by id', async () => {
    when(
      quizRepository.findOne(
        deepEqual({
          where: { quizId: 1 },
          relations: ['questions']
        })
      )
    ).thenResolve(mockedQuiz);

    const result = await quizService.getQuizById(1);

    expect(result).toEqual(ok(mockedQuiz));
  });

  it('should delete a quiz', async () => {
    const quizId = 10;
    when(quizRepository.delete(deepEqual({ quizId }))).thenResolve({
      affected: 1,
      raw: {}
    });
    const result = await quizService.deleteQuizById(quizId);

    expect(result).toEqual(ok(true));
  });

  it('should not delete a quiz', async () => {
    const quizId = 10;
    when(quizRepository.delete(deepEqual({ quizId }))).thenResolve({
      affected: 0,
      raw: {}
    });
    const result = await quizService.deleteQuizById(quizId);

    expect(result).toEqual(
      error(new NotFoundError(`Cannot delete quiz with id: ${quizId}`))
    );
  });

  it('should update a quiz', async () => {
    const quizId = 10;
    when(
      quizRepository.update(deepEqual({ quizId }), deepEqual(changeQuizOptions))
    ).thenResolve({
      affected: 1,
      raw: {},
      generatedMaps: []
    });
    const result = await quizService.updateQuizById(quizId, changeQuizOptions);
    expect(result).toEqual(ok(true));
  });

  it('should not update a quiz', async () => {
    const quizId = 10;
    when(
      quizRepository.update(deepEqual({ quizId }), deepEqual(changeQuizOptions))
    ).thenResolve({
      affected: 0,
      raw: {},
      generatedMaps: []
    });
    const result = await quizService.updateQuizById(quizId, changeQuizOptions);
    expect(result).toEqual(
      error(new NotFoundError(`Cannot change quiz with id: ${quizId}`))
    );
  });
});
