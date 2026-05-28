import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [
    UsersModule,
    HashtagModule,
    TypeOrmModule.forFeature([Tweet]),
    PaginationProvider,
  ],
})
export class TweetModule {}
