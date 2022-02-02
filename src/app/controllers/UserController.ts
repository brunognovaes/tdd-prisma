import { IUserRepository } from '../models/interfaces/IUserRepository'
import { Request, Response } from 'express';

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { user } = req.body
    const userCreated = await this.userRepository.create(user)
    return res.json(userCreated)
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const userFinded = await this.userRepository.findById(parseInt(id))
    return res.json(userFinded)
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const allUsers = await this.userRepository.findAll()
    return res.json(allUsers)
  }
}