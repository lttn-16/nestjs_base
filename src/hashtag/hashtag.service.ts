import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { Hashtag } from './entities/hashtag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async create(createHashtagDto: CreateHashtagDto) {
    let hashtag = this.hashtagRepository.create(createHashtagDto)
    return this.hashtagRepository.save(hashtag)
  }

  findAll() {
    return `This action returns all hashtag`;
  }

  public async findOne(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: {
        id: In(hashtags)
      }
    })
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  public async remove(id: number) {
    return await this.hashtagRepository.softDelete({ id })
  }
}
