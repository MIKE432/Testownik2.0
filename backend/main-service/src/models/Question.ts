import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer';
import { Quiz } from './Quiz';
import { QuestionBody } from '../controllers/Question.controller';
import { ApiProperty } from "@nestjs/swagger";

export enum QuestionType {
  SingleChoice,
  MultiChoice,
}

@Entity('question')
export class Question {

  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'question_id' })
  public questionId?: number;

  @ApiProperty()
  @Column({ name: 'question_text' })
  public question!: string;

  @ApiProperty()
  @Column({ name: 'question_abbr' })
  public abbr!: string;

  @ApiProperty()
  @OneToMany(() => Answer, (answer) => answer.question)
  public answers!: Answer[];

  @ApiProperty()
  @Column({ name: 'question_answer_type' })
  public questionType!: QuestionType;

  @ApiProperty()
  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  public quiz!: Quiz;

  constructor(
    questionId: number,
    question: string,
    abbr: string,
    answers: Answer[],
    questionType: QuestionType,
    quiz: Quiz,
  ) {
    this.questionId = questionId;
    this.question = question;
    this.abbr = abbr;
    this.answers = answers;
    this.questionType = questionType;
    this.quiz = quiz;
  }

  public static toEntity(
    questionBody: QuestionBody,
    quiz: Quiz,
    answers?: Answer[],
  ): Question {
    return {
      question: questionBody.question,
      questionType: questionBody.questionType,
      quiz,
      abbr: questionBody.abbr,
      answers: answers ?? [],
    };
  }
}
