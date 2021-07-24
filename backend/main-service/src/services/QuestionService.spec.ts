import { QuestionService } from './Question.service';
import { QuizService } from './Quiz.service';
import { anything, instance, mock, when } from "ts-mockito";
import { Connection } from "typeorm";

describe('QuestionService', () => {
    let questionService: QuestionService;
    let quizService: QuizService;
    let connection: Connection

    beforeEach(() => {
        quizService = mock(QuizService);
        connection = mock(Connection);
        questionService = new QuestionService(instance(connection), instance(quizService))
        when(quizService.getQuizById(anything())).thenResolve()
    });

    it('should add a question to a quiz', () => {

    })
});
