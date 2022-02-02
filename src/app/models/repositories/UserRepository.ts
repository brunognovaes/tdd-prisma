import { PrismaClient } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'

const prisma = new PrismaClient()

type User = {
  name: string,
  password: string,
  email: string,
  id?: number
}

export class UserRepository implements IUserRepository {
  create (user: User): Promise<User> {
    const userCreated = prisma.user.create({ data: user })
    return userCreated
  }

  findById (id: number): Promise<User | null> {
    const userFinded = prisma.user.findUnique({ where: { id } })
    return userFinded
  }

  findAll (): Promise<User[] | null> {
    const usersFinded = prisma.user.findMany()
    return usersFinded
  }
}