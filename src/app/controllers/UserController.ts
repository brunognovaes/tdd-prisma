import { IUserRepository } from '../models/interfaces/IUserRepository'

type User = {
  name: string,
  password: string,
  email: string,
  id?: number
}

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(user: User): Promise<User> {
    const userCreated = await this.userRepository.create(user)
    return userCreated
  }

  async findById(id: number): Promise<User | null> {
    const userFinded = await this.userRepository.findById(id)
    return userFinded
  }

  async findAll(): Promise<User[] | null> {
    const allUsers = await this.userRepository.findAll()
    return allUsers
  }
}