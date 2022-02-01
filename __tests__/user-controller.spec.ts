
type User = {
  name: string,
  password: string,
  email: string
}
class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: User): Promise<void> {
    await this.userRepository.create(user)
  }
}

interface UserRepository {
  create: (user: User) => Promise<void>
}

class UserRepositoryMock implements UserRepository {
  user?: Object

  async create (user: User): Promise<void> {
    this.user = user
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

    await sut.create(fakeUser)

    expect(repository.user).toBe(fakeUser)
  })
})
