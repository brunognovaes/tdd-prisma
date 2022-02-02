import UserController from '../src/app/controllers/userController'
import UserRepositoryMock from './mocks/UserRepositoryMock'
import { mockRequest, mockResponse } from 'mock-req-res'

type CreatedUser = {
  name: string,
  password: string,
  email: string,
  id?: string
}

const makeSut = () => {
  const userRepository = new UserRepositoryMock()
  const userController = new UserController(userRepository)
  return {
    sut: userController,
    repository: userRepository
  }
}

const fakeUser1: CreatedUser = { name: 'Bruno', password: '123456', email: 'bucgomes@gmail.com' }
const fakeUser2: CreatedUser = { name: 'Breno', password: '123456', email: 'becgomes@gmail.com' }

const getUserSpy = (spy) => {
  return spy.json.lastCall.firstArg
}

describe('UserController create user', () => {
  it('should create with valid infos', async () => {
    const { sut, repository } = makeSut()
    const fakeRequest = mockRequest({ body: { ...fakeUser1 } })
    const fakeResponse = mockResponse()

    await sut.create(fakeRequest, fakeResponse)
    const userCreated = getUserSpy(fakeResponse)

    expect(userCreated).toBeTruthy()
    expect(repository.users).toHaveLength(1)
    expect(repository.users).toContain(userCreated)
  })

  it('should find a User by id', async () => {
    const { sut } = makeSut()
    const fakeRequest = mockRequest({ body: { ...fakeUser1 }, params: {id: 1} })
    const fakeResponse = mockResponse()

    await sut.create(fakeRequest, fakeResponse)
    const userCreated = getUserSpy(fakeResponse)
    await sut.findById(fakeRequest, fakeResponse)
    const userFinded = getUserSpy(fakeResponse)
    
    expect(userFinded).toBe(userCreated)
  })

  // it('should find all Users', async () => {
  //   const { sut } = makeSut()

  //   const usersCreated = await Promise.all([
  //     await sut.create(fakeUser1),
  //     await sut.create(fakeUser2),
  //   ])
  //   const allUsers = await sut.findAll()

  //   expect(allUsers).toHaveLength(2)
  //   expect(allUsers).toContain(usersCreated[0])
  //   expect(allUsers).toContain(usersCreated[1])
  // })
})
