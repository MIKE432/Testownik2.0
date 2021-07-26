import { QuizService } from "./Quiz.service";
import { Repository } from "typeorm";
import { Question } from "../models/Question";
import { AnswerService } from "./Answer.service";
import { QuestionService } from "./Question.service";
import { Answer } from "../models/Answer";
import { anything, deepEqual, instance, mock, when } from "ts-mockito";
import { Quiz } from "../models/Quiz";
import { AnswerBody } from "../controllers/Answer.controller";


const answerBody: AnswerBody = {
    text: "To jest miejsce na pytanie",
    isCorrect: true,
    abbr: "1",
    questionId: 1
}

const mockedQuiz: Quiz = {
    quizId: 1,
    questions: [],
    description: "sadsa",
    name: "asd"
}

const mockedQuestion: Question = {
    quiz: mockedQuiz,
    abbr: "asd",
    question: "da s",
    questionType: 1,
    questionId: 1,
    answers: []
}


const mockedAnswer: Answer = {
    answerId: 1,
    isCorrect: answerBody.isCorrect,
    abbr: answerBody.abbr,
    text: answerBody.text,
    question: mockedQuestion
}

describe('AnswerService', () => {
    let questionService: QuestionService;
    let answerService: AnswerService;
    let answerRepository: Repository<Answer>

    beforeEach(() => {
        questionService = mock(QuestionService)
        answerRepository = mock(Repository)
        answerService = new AnswerService(instance(answerRepository), instance(questionService))
        when(questionService.getQuestionById(anything())).thenResolve(mockedQuestion)
    })

    it('should add new answer', async function () {
        when(answerRepository.save(deepEqual(Answer.toEntity(answerBody, mockedQuestion)))).thenResolve(mockedAnswer)
        const result = await answerService.createAnswer(answerBody)

        expect(result).toBe(mockedAnswer)
    });

    it('should get an answer', async function () {
        when(answerRepository.findOne(deepEqual({answerId: 1}))).thenResolve(mockedAnswer)
        const result = await answerService.getAnswerById(1)

        expect(result).toBe(mockedAnswer)
    });
})