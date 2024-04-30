import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const userAlreadyRegistered = await this.findByUsername(user.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(`O Usuário ${user.name} já existe`);
    }

    const dbUser = new UserEntity();
    dbUser.email = user.email;
    dbUser.name = user.name;
    dbUser.username = user.username;
    dbUser.password = hashSync(user.password, 10);
    dbUser.borndate = user.borndate;

    const savedUser = await this.userRepository.save(dbUser);

    return savedUser;
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!foundUser) {
      return null;
    }

    return {
      id: foundUser.id,
      name: foundUser.name,
      password: foundUser.password,
      email: foundUser.email,
      username: foundUser.username,
      borndate: foundUser.borndate,
    };
  }
}
