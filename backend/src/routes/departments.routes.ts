import express from 'express'
const router = express.Router();
import {DepartmentController} from '../controllers/departments.controller'

const departmentController = new DepartmentController();

router.post('/create',(req,res)=>{
    return departmentController.create(req,res);
})
router.get('/fetch',(req,res)=>{
    return departmentController.fetch(req,res);
})
router.get('/detail/:id',(req,res)=>{
    return departmentController.detail(req,res);
})
router.post('/remove/:id',(req,res)=>{
    return departmentController.remove(req,res);
})
router.post('/update/:id',(req,res)=>{
    return departmentController.update(req,res);
})
router.post('/status-update/:id',(req,res)=>{
    return departmentController.updateStatus(req,res);
})
export default router