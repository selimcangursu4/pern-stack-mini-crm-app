import {Router} from 'express'
import {UserController} from '../controllers/user.controller'

const router = Router()
const userController = new UserController()


router.get("/static-create",async (req,res)=>{

    await userController.staticCreateUser(req,res);
})

export default router