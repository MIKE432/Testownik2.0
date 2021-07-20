import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from "typeorm";
import {Answer} from "./Answer";
import {Quiz} from "./Quiz";

export enum QuestionType {
    SingleChoice,
    MultiChoice
}

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn({name: 'question_id'})
    questionId!: number;

    @Column({name: 'question_text'})
    question!: string;

    @Column({name: 'question_abbr'})
    abbr!: string;

    @OneToMany(() => Answer, answer => answer.question)
    answers!: Answer[];

    @Column({name: 'question_answer_type'})
    questionType!: QuestionType

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz!: Quiz
}