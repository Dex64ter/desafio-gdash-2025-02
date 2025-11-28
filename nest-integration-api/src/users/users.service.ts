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
      email: 'admin@example.com',
      userName: 'admin',
      password: '123456',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(email: string): User | undefined {
    const usuarioValidate: User | undefined = this.users.find(
      (user) => user.email === email,
    );
    return usuarioValidate;
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

  editUser(id: string, updateData: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const updatedUser = { ...this.users[userIndex], ...updateData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
}
