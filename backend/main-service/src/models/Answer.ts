import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';
import { AnswerBody } from "../controllers/Answer.controller";

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn({ name: 'answer_id' })
    public answerId?: number;

    @Column({ name: 'answer_text' })
    public text!: string;

    @Column({ name: 'answer_abbr' })
    public abbr!: string;

    @Column({ name: 'is_correct' })
    public isCorrect!: boolean;

    @ManyToOne(() => Question, (question) => question.answers)
    public question!: Question;

    constructor(
        answerId: number,
        text: string,
        abbr: string,
        isCorrect: boolean,
        question: Question
    ) {
        this.answerId = answerId
        this.text = text
        this.abbr = abbr
        this.isCorrect = isCorrect
        this.question = question
    }

    public static toEntity(answerBody: AnswerBody, question: Question): Answer {
        return {
            text: answerBody.text,
            abbr: answerBody.text,
            isCorrect: answerBody.isCorrect,
            question: question
        }
    }
}
