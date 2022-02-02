import { IUserRepository } from '../models/interfaces/IUserRepository'
import { Request, Response } from 'express';

class UserController {
  constructor(private userRepository: IUserRepository) {
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body
    const userCreated = await this.userRepository.create(user)
    return res.json(userCreated)
  }

  public findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const userFinded = await this.userRepository.findById(parseInt(id))
    return res.json(userFinded)
  }

  public findAll = async (_req: Request, res: Response): Promise<Response> => {
    const allUsers = await this.userRepository.findAll()
    return res.json(allUsers)
  }
}

export default UserController