import express from 'express'
import { UserRepository } from '../models/repositories/UserRepository'
import { UserController } from '../controllers/UserController'

const router = express.Router()
const userController = new UserController(new UserRepository())

router.get('/', userController.findAll)
router.get('/:id', userController.findById)
router.post('/', userController.create)

export = router