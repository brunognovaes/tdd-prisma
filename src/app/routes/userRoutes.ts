import express from 'express'
import { UserRepository } from '../models/repositories/userRepository'
import UserController from '../controllers/userController'

const router = express.Router()
const userRepository = new UserRepository()
const userController = new UserController(userRepository)

router.get('/', userController.findAll)
router.get('/:id', userController.findById)
router.post('/', userController.create)

export default router