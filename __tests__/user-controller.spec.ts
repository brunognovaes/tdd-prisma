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

  async findById(id: number): Promise<User | null> {
    const userFinded = await this.userRepository.findById(id)
    return userFinded
  }
}

interface UserRepository {
  create: (user: User) => Promise<User>
  findById: (id: number) => Promise<User>
}

class UserRepositoryMock implements UserRepository {
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
}

const makeSut = () => {
  const userRepository = new UserRepositoryMock()
  const userController = new UserController(userRepository)
  return {
    sut: userController,
    repository: userRepository
  }
}

const fakeUser1: User = { name: 'Bruno', password: '123456', email: 'bucgomes@gmail.com' }
const fakeUser2: User = { name: 'Breno', password: '123456', email: 'becgomes@gmail.com' }

describe('UserController create user', () => {
  it('should create with valid infos', async () => {
    const { sut, repository } = makeSut()
    
    const userCreated = await sut.create(fakeUser1)

    expect(repository.users).toContain(userCreated)
    expect(userCreated.id).toBe(1)
  })

  it('should find a User by id', async () => {
    const { sut } = makeSut()

    const userCreated = await sut.create(fakeUser1)
    const userFinded = await sut.findById(userCreated.id)
    
    expect(userFinded).toBe(userCreated)
  })
})
