type User = {
  name: string,
  password: string,
  email: string,
  id?: number
}

export interface IUserRepository {
    create: (user: User) => Promise<User>
    findById: (id: number) => Promise<User | null>
    findAll: () => Promise<User[] | null>
  }
