import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

const userService = new UserService();

export class UserController {

    // Statik Test Personel Ekleme
    async staticCreateUser(req: Request, res: Response) {
        try {
            const response = await userService.createUserStatic();
            return res.status(201).json({
                success: true,
                message: "Statik Kullanıcı Ekleme Başarılı"
            })
        } catch (err: any) {
            return res.status(401).json({
                success: false,
                message: "Statik Kullanıcı Ekleme Başarısız",
                err: err.message
            })

        }
    }
    // Kullanıcı Ekleme
    async createUser(req:Request,res:Response)
    {
        try {
            const formData = req.body
            const response = await userService.create(formData);
            return res.status(201).json({
                success: true,
                message: "Kullanıcı Ekleme Başarılı"
            })
        } catch (error:any) {
            return res.status(401).json({
                success: false,
                message: "Kullanıcı Ekleme Başarısız",
                err: error.message
            })
        }
    }
}