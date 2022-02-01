class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: Object): Promise<void> {
    await this.userRepository.create(user)
  }
}

interface UserRepository {
  create: (user: Object) => Promise<void>
}

class UserRepositoryMock implements UserRepository {
  user?: Object

  async create (user: Object): Promise<void> {
    this.user = user
  }
}

describe('UserController create user', () => {
  it('should create with valid infos', async () => {
    const userRepository = new UserRepositoryMock()
    const userController = new UserController(userRepository)
    const fakeUser = { name: 'Bruno', password: '123456', email: 'bucgomes@gmail.com' }

    await userController.create(fakeUser)

    expect(userRepository.user).toBe(fakeUser)
  })
})
