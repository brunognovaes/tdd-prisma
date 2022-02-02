type User = {
  name: string,
  password: string,
  email: string,
  id?: number
}

class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: User): Promise<User> {
    const userCreated = await this.userRepository.create(user)
    return userCreated
  }
}

interface UserRepository {
  create: (user: User) => Promise<User>
}

class UserRepositoryMock implements UserRepository {
  user?: User
  userId: number
  constructor() {
    this.userId = 1
  }

  async create (user: User): Promise<User> {
    user.id = this.userId
    this.user = user
    this.userId += 1

    return this.user
  }
}

const makeSut = () => {
  const userRepository = new UserRepositoryMock()
  const userController = new UserController(userRepository)
  return {
    sut: userController,
    repository: userRepository
  }
}

describe('UserController create user', () => {
  it('should create with valid infos', async () => {
    const {sut, repository} = makeSut()
    const fakeUser: User = { name: 'Bruno', password: '123456', email: 'bucgomes@gmail.com' }

    const userCreated = await sut.create(fakeUser)

    expect(userCreated).toBe(repository.user)
    expect(userCreated.id).toBe(1)
  })
})
