import express from 'express'
const router = express.Router();
import {RoleController} from '../controllers/roles.controller'

const roleController = new RoleController();

router.post('/create',(req,res)=>{
    return roleController.create(req,res);
})
router.get('/fetch',(req,res)=>{
    return roleController.fetch(req,res);
})
router.get('/detail/:id',(req,res)=>{
    return roleController.detail(req,res);
})
router.post('/remove/:id',(req,res)=>{
    return roleController.remove(req,res);
})
router.post('/update/:id',(req,res)=>{
    return roleController.update(req,res);
})
export default router