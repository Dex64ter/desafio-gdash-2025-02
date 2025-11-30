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
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiOkResponse({ description: 'A list of users' })
  @Get() // /users
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Obtains a user' })
  @Get(':id') // /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiOkResponse({ description: 'Obtains a user' })
  @Get('user-email/:email') // /users/user-email/:email
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'The user has been successfully created.' })
  @Post() // /users
  createUser(
    @Body()
    createUserDTO: CreateUserDto,
  ) {
    return this.usersService.create(createUserDTO);
  }

  @ApiOperation({ summary: 'Update an existing user' })
  @ApiOkResponse({ description: 'The user has been successfully updated.' })
  @Put(':id') // /users/:id
  updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDTO: { email?: string; userName?: string; password?: string },
  ) {
    return this.usersService.update(id, updateUserDTO);
  }

  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiOkResponse({ description: 'The user has been successfully deleted.' })
  @Delete(':id') // /users/:id
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
