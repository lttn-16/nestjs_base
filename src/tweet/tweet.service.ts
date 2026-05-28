import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { GetTweetQueryDto } from './dto/get-tweet.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,

    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async create(createTweetDto: CreateTweetDto) {
    let user = await this.userService.findOne(createTweetDto.userId);
    const hashtags = await this.hashtagService.findOne(
      createTweetDto.hashtags ?? [],
    );
    let tweet = this.tweetRepository.create({
      ...createTweetDto,
      user: user!,
      hashtags,
    });
    return await this.tweetRepository.save(tweet);
  }

  public async getTweets(userId: number, paginationQueryDto: GetTweetQueryDto) {
    let user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const searchOptions: FindManyOptions<Tweet> = {
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        hashtags: true,
      },
      order: {
        createdAt: 'DESC',
      },
    };
    return await this.paginationProvider.paginate(
      this.tweetRepository,
      paginationQueryDto,
      searchOptions,
    );
  }

  findAll() {
    return `This action returns all tweet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  public async update(updateTweetDto: UpdateTweetDto) {
    // find all hashtags
    let hashtags = await this.hashtagService.findOne(
      updateTweetDto.hashtags ?? [],
    );
    // find tweet
    let tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });
    if (!tweet) throw new Error('');

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.hashtags = hashtags;
    return await this.tweetRepository.save(tweet);
  }

  public async remove(id: number) {
    return await this.tweetRepository.delete({ id });
  }
}
