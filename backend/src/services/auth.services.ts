import { pool } from '../config/db'
import {comparePassword} from '../utils/bcrypt'
import {LoginDTO} from '../types/auth.types'
import {generateToken} from '../utils/jwt'

export class AuthService{

    async login(LoginData : LoginDTO)
    {
        // E Posta Kontrolü
        const emailCheck = await pool.query("SELECT * FROM users WHERE business_email = $1",[LoginData.email]);
        const user = emailCheck.rows[0]

        if(!user)
        {
            throw new Error("E Posta bulunamadı");
        }
        // Şifre Hash 
        const isMatch = await comparePassword(LoginData.password,user.password);

        if (!isMatch) {
            throw new Error("Şifre Hatalı !")
        }    
        // Token Üret 
        const token = generateToken({
            user_id:user.id,
            email:user.business_email,
            roleId:user.role_id
        })

        return {
            token,
            user:{
                id: user.id,
                email: user.business_email,
                fullname: user.fullname
            }
        }
        
    }
}