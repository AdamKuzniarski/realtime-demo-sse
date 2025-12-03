import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findAll() {
    return await this.questionRepository.find();
  }

  async findOne(id: string) {
    return await this.questionRepository.findOneBy({ id });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
    return await this.questionRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.questionRepository.delete(id);
  }
}
