import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // /users/:id
  findOne(@Param('id') id: string) {
    return { message: `This action returns a user by id: ${id}` };
  }

  @Post() // /users
  createUser(@Body() createUserDTO: { userName: string; password: string }) {
    return { message: `User ${createUserDTO.userName} created successfully` };
  }
}
