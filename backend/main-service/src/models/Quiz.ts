import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity('quiz')
export class Quiz {
    @PrimaryGeneratedColumn({name: 'quiz_id'})
    quizId!: number

    @Column({name: 'quiz_name'})
    name!: string

    @Column({name: 'quiz_description'})
    description!: string

    @OneToMany(() => Question, question => question.quiz)
    questions!: Question[]
}