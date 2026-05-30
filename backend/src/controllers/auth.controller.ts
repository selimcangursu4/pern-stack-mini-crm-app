
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.services'


const authService = new AuthService();

export class LoginController {

    async login(req: Request, res: Response) {
        try {
            const formData = req.body

            const ip =
                (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                req.socket.remoteAddress ||
                req.ip ||
                'unknown'

            const result = await authService.login(formData, ip)

            return res.status(200).json({
                success: true,
                message: "Giriş Başarılı!",
                data: result
            })

        } catch (err: any) {
            return res.status(401).json({
                success: false,
                message: `Giriş Hatalı: ${err.message}`
            })
        }
    }
}