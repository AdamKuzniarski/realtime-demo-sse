import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type sessionId = Session['id'];

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @OneToMany(() => Question, (question) => question.session, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;
}
