import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  email?: string;
  userName: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com',
      userName: 'email',
      password: process.env.DEFAULT_ADMIN_PASSWORD || '123456',
    },
    {
      id: '2',
      email: 'john_doe@example.com',
      userName: 'john_doe',
      password: 'password123',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(userName: string, password: string): User {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      userName,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }
}
