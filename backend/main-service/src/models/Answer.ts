import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';
import { AnswerBody } from '../controllers/Answer.controller';
import { ApiProperty } from "@nestjs/swagger";

@Entity('answer')
export class Answer {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'answer_id' })
  public answerId?: number;

  @ApiProperty()
  @Column({ name: 'answer_text' })
  public text!: string;

  @ApiProperty()
  @Column({ name: 'answer_abbr' })
  public abbr!: string;

  @ApiProperty()
  @Column({ name: 'is_correct' })
  public isCorrect!: boolean;

  @ApiProperty()
  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  public question!: Question;

  constructor(
    answerId: number,
    text: string,
    abbr: string,
    isCorrect: boolean,
    question: Question,
  ) {
    this.answerId = answerId;
    this.text = text;
    this.abbr = abbr;
    this.isCorrect = isCorrect;
    this.question = question;
  }

  public static toEntity(answerBody: AnswerBody, question: Question): Answer {
    return {
      text: answerBody.text,
      abbr: answerBody.abbr,
      isCorrect: answerBody.isCorrect,
      question: question,
    };
  }
}
