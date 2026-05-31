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
    // Kullanıcıyı Güncelle
    async updateUser(req:Request,res:Response)
    {
        try {
            const id = req.params.id as string
            const formData = req.body
            const response = await userService.update(id,formData)
    
            return res.status(200).json({
                success:true,
                message:"Kullanıcı Güncelleme İşlemi Başarılı",
                data:response
    
            }) 
        } catch (error:any) {
            return res.status(200).json({
                success:true,
                message:"Kullanıcı Güncelleme İşlemi Başarısız",
                error:error.message    
            }) 
        }
    }
    // Kullanıcı Durumu Güncelleme
    async updateStatusId(req:Request,res:Response)
    {
        try {
            const userId = req.params.id as String
            const { employee_status_id } = req.body;
            const response = await userService.statusUpdate(userId,employee_status_id);

            return res.status(201).json({
                success:true,
                message:"Kullanıcı Durumu Değiştirildi!"
            })
        } catch (error:any) {
            return res.status(201).json({
                success:true,
                message:"Kullanıcı Durumu Değiştirilemedi!",
                error:error.message
            })
        }
    }
    // Kullanıcı Rolünü Güncelle
    async updateUserRole(req:Request,res:Response)
    {
        try {
            const roleId = req.params.id as string
            const {role_id} = req.body
            const role = await userService.userRoleUpdate(roleId,role_id)
            return res.status(201).json({
                success:true,
                message:"Kullanıcı Rolü Değiştirildi!",
                data:role

            }) 
        } catch (error:any) {
            return res.status(401).json({
                success:true,
                message:"Kullanıcı Rolü Değiştirilemedi!",
                error:error.message
            }) 
        }
    }
    // Departman Atama / Güncelleme
    async updateUserDepartment(req:Request,res:Response)
    {
        try {
            const id = req.params.id as string
            const {department_id} = req.body
            const role = await userService.userRoleUpdate(id,department_id)
            return res.status(201).json({
                success:true,
                message:"Kullanıcı Departmanı Değiştirildi!",
                data:role

            }) 
        } catch (error:any) {
            return res.status(401).json({
                success:true,
                message:"Kullanıcı Departmanı Değiştirilemedi!",
                error:error.message
            }) 
        }
    }
    // Parola Değiştirme
    async updatePassword(req:Request,res:Response)
    {
        try {
            const id = req.params.id as string
            const {password} = req.body
            const role = await userService.changePassword(id,password)
            return res.status(201).json({
                success:true,
                message:"Kullanıcı Şifresi Değiştirildi!",
                data:role

            }) 
        } catch (error:any) {
            return res.status(401).json({
                success:true,
                message:"Kullanıcı Şifresi Değiştirilemedi!",
                error:error.message
            })   
        }
    }
    // Kullanıcı Arama 
    async searchUser(req:Request,res:Response)
    {
        try {
            const searchData = req.body
            const data = await userService.search(searchData)

            if(!data || data.length === 0)   
            {
                return res.status(404).json({
                    success:true,
                    message:"İlgili Kullanıcı Bulunamadı!",
                    data:data
    
                })   
            }
           
            return res.status(201).json({
                success:true,
                message:"Arama Sonucu Başarılı !",
                data:data

            })  
        } catch (error:any) {
            return res.status(401).json({
                success:true,
                message:"Arama Sonucu Başarısız!",
                error:error.message
            })   
        }
    }
}