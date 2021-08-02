import { QuizService } from './Quiz.service';
import { Repository } from 'typeorm';
import { Quiz } from '../models/Quiz';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import { QuizBody } from '../controllers/Quiz.controller';
import { ok } from '../Result';

const mockedQuizBody: QuizBody = {
  description: 'ads',
  name: 'asdd',
};

const mockedQuiz: Quiz = {
  quizId: 1,
  questions: [],
  description: mockedQuizBody.description,
  name: mockedQuizBody.name,
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
      quizRepository.save(deepEqual(Quiz.toEntity(mockedQuizBody))),
    ).thenResolve(mockedQuiz);
    const result = await quizService.createQuiz(mockedQuizBody);

    expect(result).toEqual(ok(mockedQuiz));
  });

  it('should get quiz by id', async () => {
    when(
      quizRepository.findOne(
        deepEqual({
          where: { quizId: 1 },
          relations: ['questions'],
        }),
      ),
    ).thenResolve(mockedQuiz);

    const result = await quizService.getQuizById(1);

    expect(result).toEqual(ok(mockedQuiz));
  });
});
