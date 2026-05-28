import { forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider)) 
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async create(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {};
    const existEmail = await this.userRepository.findOne({
      where: [{ email: userDto.email }, { username: userDto.username }],
    });
    if (existEmail) {
      throw new Error('User with this email already exists');
    }

    const newUser = this.userRepository.create({
      ...userDto,
      password: await this.hashingProvider.hashPassword(userDto.password),
    });
    return await this.userRepository.save(newUser);
  }

  public async findAll() {
    try {
      // return child along with parent when call get (similar to populate)
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('An error has occured', {
        description: 'DB not connect',
      });
    }
  }

  public async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: string) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
