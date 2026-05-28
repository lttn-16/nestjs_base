import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get(':userid')
  getUserId(
    @Param('userid', ParseIntPipe) userid: number,
    @Query() paginationQueryDto: PaginationDto,
  ) {
    return this.tweetService.getTweets(userid, paginationQueryDto);
  }

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Patch()
  update(@Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.update(updateTweetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.remove(id);
  }
}
