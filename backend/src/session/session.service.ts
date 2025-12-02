import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { sessionId } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const sessionEntry = this.sessionRepository.create(createSessionDto);
    return await this.sessionRepository.save(sessionEntry);
  }

  async findAll() {
    return await this.sessionRepository.find();
  }

  async findOne(id: sessionId) {
    return await this.sessionRepository.findOneBy({ id });
  }

  async update(id: sessionId, updateSessionDto: UpdateSessionDto) {
    await this.sessionRepository.update(id, updateSessionDto);
    return await this.sessionRepository.findOneBy({ id });
  }

  async remove(id: sessionId) {
    return await this.sessionRepository.delete(id);
  }
}
