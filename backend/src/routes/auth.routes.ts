import { Router } from 'express'
import {LoginController} from '../controllers/auth.controller'

const router = Router()
const loginController = new LoginController()

router.post('/login', async (req, res) => {
    await loginController.login(req, res)
})

export default router