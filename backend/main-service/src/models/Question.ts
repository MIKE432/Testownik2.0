import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Repository,
} from 'typeorm';
import { Answer } from './Answer';
import { Quiz } from './Quiz';
import { QuestionBody } from "../controllers/Question.controller";

export enum QuestionType {
    SingleChoice,
    MultiChoice,
}

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn({ name: 'question_id' })
    public questionId?: number;

    @Column({ name: 'question_text' })
    public question!: string;

    @Column({ name: 'question_abbr' })
    public abbr!: string;

    @OneToMany(() => Answer, (answer) => answer.question)
    public answers!: Answer[];

    @Column({ name: 'question_answer_type' })
    public questionType!: QuestionType;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    public quiz!: Quiz;

    constructor(
        questionId: number,
        question: string,
        abbr: string,
        answers: Answer[],
        questionType: QuestionType,
        quiz: Quiz
    ) {
        this.questionId = questionId
        this.question = question
        this.abbr = abbr
        this.answers = answers
        this.questionType = questionType
        this.quiz = quiz
    }

    public static toEntity(questionBody: QuestionBody, quiz: Quiz, answers?: Answer[]): Question {
        return {
            question: questionBody.question,
            questionType: questionBody.questionType,
            quiz,
            abbr: questionBody.abbr,
            answers: answers ?? []
        }
    }
}
