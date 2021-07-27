import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './Question';
import { QuizBody } from '../controllers/Quiz.controller';

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn({ name: 'quiz_id' })
  public quizId?: number;

  @Column({ name: 'quiz_name' })
  public name!: string;

  @Column({ name: 'quiz_description' })
  public description!: string;

  @OneToMany(() => Question, (question) => question.quiz)
  public questions!: Question[];

  constructor(
    quizId: number,
    name: string,
    description: string,
    questions: Question[],
  ) {
    this.quizId = quizId;
    this.name = name;
    this.description = description;
    this.questions = questions;
  }

  public static toEntity(quizBody: QuizBody, questions?: Question[]): Quiz {
    return {
      name: quizBody.name,
      description: quizBody.description,
      questions: questions ?? [],
    };
  }
}
