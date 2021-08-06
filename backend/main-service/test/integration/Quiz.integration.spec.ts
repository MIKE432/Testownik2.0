import { AppApi } from '../AppApi';
import { QuizBody } from '../../src/controllers/Quiz.controller';
import { AxiosResponse } from 'axios';
import { Quiz } from '../../src/models/Quiz';

describe('QuizIntegrationTests', () => {
  const api = new AppApi();
  const quizBody: QuizBody = {
    description: 'ads',
    name: 'adss'
  };

  beforeEach(() => {
    api.deleteAllQuizzes();
  });

  it('should add quiz', async () => {
    const { status, data }: AxiosResponse = await api.postQuiz(quizBody);

    expect(status).toEqual(201);
    expect(data).toHaveProperty('description', quizBody.description);
    expect(data).toHaveProperty('name', quizBody.name);
  });

  it('should properly delete a quiz', async () => {
    // const { status, data }: AxiosResponse<>;
    const { data: postQuiz }: AxiosResponse<Quiz> = await api.postQuiz(
      quizBody
    );
    const quizId = postQuiz.quizId;

    // const { status, data }: AxiosResponse<>;
  });
});
