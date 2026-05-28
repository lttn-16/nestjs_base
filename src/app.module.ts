import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import envValidator from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV.trim()}`
        : '.env',
      load: [appConfig, databaseConfig],
      validationSchema: envValidator,
    }),
    UsersModule,
    TweetModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // mọi query tới database sẽ được xử lý async, không block application
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get('database.syncronize'),
        //entities: [User],
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        host: configService.get('database.host'),
        port: +configService.get('database.port'),

        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
    ProfileModule,
    HashtagModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
