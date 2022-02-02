import { IUserRepository } from '../../src/app/models/interfaces/IUserRepository' 

type User = {
  name: string,
  password: string,
  email: string,
  id?: number
}

export class UserRepositoryMock implements IUserRepository {
  users?: User[]
  userId: number
  constructor() {
    this.userId = 1
    this.users = []
  }

  async create (user: User): Promise<User> {
    user.id = this.userId
    this.users.push(user)
    this.userId += 1

    return user
  }

  async findById (id: number): Promise<User | null> {
    const userFinded = this.users.find((user) => user.id === id)
    return userFinded ? userFinded : null
  }

  async findAll (): Promise<User[] | null> {
    return this.users
  }
}