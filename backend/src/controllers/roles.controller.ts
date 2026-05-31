import { RoleService } from '../services/roles.service'
import { Request, Response } from 'express';

const roleService = new RoleService();

export class RoleController {

    async create(req: Request, res: Response) {
        try {
            const formData = req.body
            const response = await roleService.create(formData)
            return res.status(201).json({
                success: false,
                message: "Yeni Rol Ekleme Başarılı",
                data: response
            })
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: "Yeni Rol Eklenemedi",
                error: error.message
            })
        }
    }
    async fetch(req: Request, res: Response) {

        try {
            const response = await roleService.fetch();

            return res.status(201).json({
                success: true,
                message: "Tüm Kullanıcı Rolleri Getirildi!",
                data: response
            })
        } catch (error: any) {
            return res.status(401).json({
                success: true,
                message: " Kullanıcı Rolleri Listelenmedi Hata!",
                data: error.message
            })
        }
    }
    async detail(req: Request, res: Response) {
        try {
            const roleId = req.params.id as string
            const response = await roleService.detail(roleId);
            return res.status(201).json({
                success: true,
                message: " Kullanıcı Detay Listelendi!",
                data: response
            })
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: " Kullanıcı Detay Listelenmedi Hata!",
                error: error.message
            })
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const roleId = req.params.id as string;

            const response = await roleService.remove(roleId);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Rol Silinemedi",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Rol Başarıyla Silindi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Rol Silinemedi",
                error: error.message
            });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const roleId = req.params.id as string;
            const formData = req.body;

            const response = await roleService.update(roleId, formData);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Rol Güncellenemedi Rol Bulunamadı",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Rol Güncelleme Başarılı",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Rol Güncellenemedi",
                error: error.message
            });
        }
    }
    async updateStatus(req: Request, res: Response) {
        try {
            const roleId = req.params.id as string;
            const statusId = Number(req.body.statusId);

            const response = await roleService.roleStatusUpdate(roleId, statusId);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Rol Bulunamadı Güncellenemedi",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Rol Durumu Güncellendi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Rol Durumu Güncellenemedi",
                error: error.message
            });
        }
    }
}