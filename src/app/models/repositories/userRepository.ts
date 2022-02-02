import { PrismaClient, User } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'

const prisma = new PrismaClient()

type UserToCreate = {
  name: string,
  email: string,
  password: string,
}

class UserRepository implements IUserRepository {
  public create = async (user: UserToCreate): Promise<User> => {
    const userCreated = await prisma.user.create({ data: { ...user } })
    return userCreated
  }

  public findById = async (id: number): Promise<User | null> => {
    const userFinded = await prisma.user.findUnique({ where: { id } })
    return userFinded
  }

  public findAll = async (): Promise<User[] | null> => {
    const usersFinded = await prisma.user.findMany()
    return usersFinded
  }
}

export default UserRepository