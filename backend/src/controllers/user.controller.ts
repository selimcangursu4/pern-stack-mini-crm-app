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
    // Tüm Kullanıcıları Listele
    async fetchUser(req:Request,res:Response)
    {
        try {
          const response = await userService.listUsers()
          return res.status(201).json({
            success:true,
            message:"Kullancıların Tümü Listelendi",
            data:response
          })
        } catch (error:any) {
            return res.status(401).json({
                success: false,
                message: "Kullanıcı Ekleme Başarısız",
                err: error.message
            })  
        }
    }
    // Kullanıcı Detayını Getir
    async detailUser(req:Request,res:Response)
    {
        try {
            const userId = req.params.id as string;
            const response = await userService.userDetail(userId)
            return res.status(200).json({
                success:true,
                message:"İlgili Kullanıcı Bilgileri Getirildi",
                data:response
            })
        } catch (error:any) {
            return res.status(401).json({
                success:false,
                message:"İlgili Kullanıcı Bilgileri Getirilemedi Hata!",
                error:error.message
            })
        }
    }
    // Kullanıcıyı Sil
    async removeUser(req:Request,res:Response)
    {
        try {
            const id = req.params.id as string
            const response = await userService.removeUser(id)
    
            return res.status(200).json({
                success:true,
                message:"Kullanıcı Silme İşlemi Başarılı",
    
            }) 
        } catch (error:any) {
            return res.status(200).json({
                success:true,
                message:"Kullanıcı Silme İşlemi Başarısız",
                error:error.message    
            })  
        }
    }
}