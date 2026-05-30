import {Router} from 'express'
import {UserController} from '../controllers/user.controller'

const router = Router()
const userController = new UserController()


router.get("/static-create",async (req,res)=>{
    await userController.staticCreateUser(req,res);
})
router.post("/create",async (req,res)=>{
    await userController.createUser(req,res);
})
router.get("/fetch",async (req,res)=>{
    await userController.fetchUser(req,res);
})
export default router