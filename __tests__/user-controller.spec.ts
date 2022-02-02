import { UserController } from '../src/app/controllers/UserController'
import { UserRepositoryMock } from './mocks/UserRepositoryMock'

type User = {
  name: string,
  password: string,
  email: string,
  id?: number
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

    expect(repository.users).toHaveLength(1)
    expect(repository.users).toContain(userCreated)
    expect(userCreated.id).toBe(1)
  })

  it('should find a User by id', async () => {
    const { sut } = makeSut()

    const userCreated = await sut.create(fakeUser1)
    const userFinded = await sut.findById(userCreated.id)
    
    expect(userFinded).toBe(userCreated)
  })

  it('should find all Users', async () => {
    const { sut } = makeSut()

    const usersCreated = await Promise.all([
      await sut.create(fakeUser1),
      await sut.create(fakeUser2),
    ])
    const allUsers = await sut.findAll()

    expect(allUsers).toHaveLength(2)
    expect(allUsers).toContain(usersCreated[0])
    expect(allUsers).toContain(usersCreated[1])
  })
})
