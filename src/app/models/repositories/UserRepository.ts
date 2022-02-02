import { PrismaClient, User } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'

const prisma = new PrismaClient()

type UserToCreate = {
  name: string,
  email: string,
  password: string,
}

export class UserRepository implements IUserRepository {
  async create (user: UserToCreate): Promise<User> {
    const userCreated = await prisma.user.create({ data: user })
    return userCreated
  }

  async findById (id: number): Promise<User | null> {
    const userFinded = await prisma.user.findUnique({ where: { id } })
    return userFinded
  }

  async findAll (): Promise<User[] | null> {
    const usersFinded = await prisma.user.findMany()
    return usersFinded
  }
}