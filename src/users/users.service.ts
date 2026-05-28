import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  public async create(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {};
    const existEmail = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (existEmail) {
      throw new Error('User with this email already exists');
    }
    const newUser = this.userRepository.create(userDto);
    return await this.userRepository.save(newUser);
  }

  findAll() {
    // return child along with parent when call get (similar to populate)
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: string) {
    await this.userRepository.delete(id)
    return { deleted: true }
  }
}
