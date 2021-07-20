import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from './Question'


@Entity('answer')
export class Answer {

    @PrimaryGeneratedColumn({name:'answer_id'})
    answerId!: number;

    @Column({name: 'answer_text'})
    text!: string;

    @Column({name:'answer_abbr'})
    abbr!: string;

    @Column({name: 'is_correct'})
    isCorrect!: boolean;

    @ManyToOne(() => Question, question => question.answers)
    question!: Question;
}