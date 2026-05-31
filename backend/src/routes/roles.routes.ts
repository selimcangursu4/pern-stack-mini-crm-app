import express from 'express'
const router = express.Router();
import {RoleController} from '../controllers/roles.controller'

const roleController = new RoleController();

router.post('/create',(req,res)=>{
    return roleController.create(req,res);
})

export default router