import { DepartmentService } from '../services/departments.services'
import { Request, Response } from 'express';

const departmentService = new DepartmentService();

export class DepartmentController {

    async create(req: Request, res: Response) {
        try {
            const formData = req.body;

            const response = await departmentService.create(formData);

            return res.status(201).json({
                success: true,
                message: "Departman başarıyla oluşturuldu",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departman oluşturulamadı",
                error: error.message
            });
        }
    }

    async fetch(req: Request, res: Response) {
        try {
            const response = await departmentService.fetch();

            return res.status(200).json({
                success: true,
                message: "Departmanlar listelendi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departmanlar listelenemedi",
                error: error.message
            });
        }
    }

    async detail(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const response = await departmentService.detail(id);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Departman bulunamadı"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Departman detayı getirildi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departman detayı alınamadı",
                error: error.message
            });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const response = await departmentService.remove(id);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Departman silinemedi"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Departman başarıyla silindi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departman silinemedi",
                error: error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const formData = req.body;

            const response = await departmentService.update(id, formData);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Departman güncellenemedi"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Departman başarıyla güncellendi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departman güncellenemedi",
                error: error.message
            });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const statusId = Number(req.body.statusId);

            const response = await departmentService.statusUpdate(id, statusId);

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Departman durumu güncellenemedi"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Departman durumu güncellendi",
                data: response
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: "Departman durumu güncellenemedi",
                error: error.message
            });
        }
    }
}