import { QuestionService } from './Question.service';
import { QuizService } from './Quiz.service';
import { anything, deepEqual, instance, mock, when } from "ts-mockito";
import { Connection, createConnection, getConnection, Repository } from "typeorm";
import { Quiz } from "../models/Quiz";
import { QuestionBody } from "../controllers/Question.controller";
import { Question } from "../models/Question";


const mockedQuiz: Quiz = {
    quizId: 1,
    questions: [],
    description: "Test sprawdzający czy serio jestem fajny",
    name: "Sprawdz czy jesteś fajny!"
}

const questionBody: QuestionBody = {
    question: "Serio myślisz ze jesteś fajny?",
    abbr: "1",
    questionType: 1,
    quizId: 1,
}

const mockedQuestion: Question = {
    question: questionBody.question,
    questionType: questionBody.questionType,
    quiz: mockedQuiz,
    abbr: questionBody.abbr,
    answers: []
}

describe('QuestionService', () => {
    let questionService: QuestionService;
    let quizService: QuizService;
    let questionRepository: Repository<Question>

    beforeEach(() => {
        quizService = mock(QuizService);
        questionRepository = mock(Repository);
        questionService = new QuestionService(instance(questionRepository), instance(quizService))
        when(quizService.getQuizById(anything())).thenResolve(mockedQuiz)
    });

    it('should add a question to a quiz', async () => {
        when(questionRepository.save(deepEqual(Question.toEntity(questionBody, mockedQuiz)))).thenResolve(mockedQuestion)
        const result = await questionService.createQuestion(questionBody)

        expect(result).toBe(mockedQuestion)
    })

    it('should get a question', async () => {
        when(questionRepository.findOne(deepEqual({ questionId: 1 } ))).thenResolve(mockedQuestion)

        const result = await questionService.getQuestionById(1)
        expect(result).toBe(mockedQuestion)
    });
});
