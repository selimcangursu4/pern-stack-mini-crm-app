import { pool } from '../config/db'
import { comparePassword } from '../utils/bcrypt'
import { LoginDTO } from '../types/auth.types'
import { generateToken } from '../utils/jwt'
import { Request, Response } from 'express'

export class AuthService {

    async login(LoginData: LoginDTO, ip: string) {

        // Giriş Loglarının Eklenmesi
        const log = async (process: string, description: string, userId?: string | null, status: string = "FAILED") => {
            await pool.query(
                `INSERT INTO system_logs (user_id, process, description, ip_address, process_status)
                 VALUES ($1,$2,$3,$4,$5)`,
                [userId || null, process, description, ip, status]
            )
        }
        // E-Posta Adresi Kontrolü
        const emailCheck = await pool.query(
            "SELECT * FROM users WHERE business_email = $1",
            [LoginData.email]
        )

        const user = emailCheck.rows[0]

        if (!user) {
            await log("LOGIN_ATTEMPT", `E-Posta Adresi Bulunamadı: ${LoginData.email}`)
            throw new Error("E Posta bulunamadı")
        }

        // Şifre ile Eşleşme Kontrolü
        const isMatch = await comparePassword(LoginData.password, user.password)

        if (!isMatch) {
            await log("LOGIN_ATTEMPT", `Şifre Hatalı ${LoginData.email}`, user.id)
            throw new Error("Şifre Hatalı !")
        }

        // TOken Oluştur
        const token = generateToken({
            user_id: user.id,
            email: user.business_email,
            roleId: user.role_id
        })

        await log("LOGIN_SUCCESS", "Kullanıcı Girişi Başarılı", user.id, "SUCCESS")

        return {
            token,
            user: {
                id: user.id,
                email: user.business_email,
                fullname: user.fullname
            }
        }
    }
}