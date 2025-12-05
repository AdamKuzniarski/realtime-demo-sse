import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async create(CreateQuestionDto: CreateQuestionDto): Promise<Question> {
    const questionEntry = this.questionRepository.create(CreateQuestionDto);
    return await this.questionRepository.save(questionEntry);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findBySession(sessionId: string): Promise<Question[]> {
    return this.questionRepository.find({
      where: { sessionId },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
    return await this.questionRepository.findOneBy({ id });
  }

  async upvote(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    question.upvotes += 1;
    return this.questionRepository.save(question);
  }

  async remove(id: string) {
    return await this.questionRepository.delete(id);
  }

  async getStream(sessionId: string): Promise<Question[]> {
    console.log('Streaming questions for session:', sessionId);
    const questions = await this.questionRepository.find({
      where: { sessionId },
    });

    console.log(questions);
    return questions;
  }
}
