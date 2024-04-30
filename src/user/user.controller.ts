import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.userService.create(user);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  /*
  @Get('/')
  findAll(): UserDto[] {
    return this.userService.findAll();
  }

  
  @Put()
  update(@Body() user: UserDto) {
    this.userService.update(user);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    //return this.userService.remove(id);
  }
  */
}
