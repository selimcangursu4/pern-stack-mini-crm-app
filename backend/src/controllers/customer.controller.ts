import { CustomerService } from '../services/customer.services';
import { Request, Response } from 'express';

const customerService = new CustomerService();

export class CustomerController {

    // Yeni Müşteri Ekle
    async create(req: Request, res: Response) {
        try {
            const customer = await customerService.createCustomer(req.body);
            return res.status(201).json({
                success: true,
                message: "Müşteri Başarıyla Eklendi",
                data: customer
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteri Eklenemedi",
                error
            });
        }
    }

    // Müşterileri Listele
    async getAll(req: Request, res: Response) {
        try {
            const customers = await customerService.getCustomers(req.query as any);

            return res.status(200).json({
                success: true,
                data: customers
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteriler Listelenemedi",
                error
            });
        }
    }

    // Müşteri Detay
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const customer = await customerService.getCustomerById(id);

            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Müşteri Bulunamadı"
                });
            }

            return res.status(200).json({
                success: true,
                data: customer
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteri Bilgisi Çekilemedi",
                error
            });
        }
    }

    // Müşteri Güncelle
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const updatedCustomer = await customerService.updateCustomer(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Müşteri Bilgisi Güncellendi",
                data: updatedCustomer
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteri Bilgisi Güncellenemedi",
                error
            });
        }
    }

    // Müşteri Sil
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const deleted = await customerService.deleteCustomer(id);

            return res.status(200).json({
                success: true,
                message: "Müşteri Başarıyla Silindi",
                data: deleted
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteri Silinemedi",
                error
            });
        }
    }

    // Müşteri Ara
    async search(req: Request, res: Response) {
        try {
            const search = req.query.q as string;

            const result = await customerService.searchCustomer(search);

            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Müşteri Bulunamadı",
                error
            });
        }
    }

    // Agent değiştir
    async changeAgent(req: Request, res: Response) {
        try {
            const customerId = Number(req.params.id);
            const { agent_id } = req.body;

            const updated = await customerService.changeAgent(customerId, agent_id);

            return res.status(200).json({
                success: true,
                message: "Yetkili Kişi Başarıyla Güncellendi",
                data: updated
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Yetkili Kişi Değiştirilemedi",
                error
            });
        }
    }

    // Müşteri Notu Ekle
    async createNote(req: Request, res: Response) {
        try {
            const customerId = Number(req.params.id);
            const { description } = req.body;
    
            const userId = req.user?.user_id;
    
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
    
            const response = await customerService.createNote(
                customerId,
                description,
                userId
            );
    
            return res.status(201).json({
                success: true,
                message: "Müşteri notu başarıyla eklendi",
                data: response
            });
    
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}