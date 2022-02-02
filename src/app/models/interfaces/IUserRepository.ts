import { User } from "@prisma/client"

export interface IUserRepository {
    create(user: User): Promise<User>
    findById(id: number): Promise<User | null>
    findAll(): Promise<User[] | null>
  }
