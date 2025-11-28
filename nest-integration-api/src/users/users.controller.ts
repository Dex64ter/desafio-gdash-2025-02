import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    return this.usersService.findOne(id);
  }

  @Post() // /users
  createUser(
    @Body()
    createUserDTO: {
      email: string;
      userName: string;
      password: string;
    },
  ) {
    return { message: `User ${createUserDTO.userName} created successfully` };
  }

  @Put(':id') // /users/:id
  updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDTO: { email?: string; userName?: string; password?: string },
  ) {
    return {
      message: `User with id ${id} updated successfully, new data: ${JSON.stringify(updateUserDTO)}`,
    };
  }

  @Delete(':id') // /users/:id
  deleteUser(@Param('id') id: string) {
    return { message: `User with id ${id} deleted successfully` };
  }
}
