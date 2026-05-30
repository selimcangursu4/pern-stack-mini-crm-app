import { pool } from '../config/db'
import { hashPassword } from '../utils/bcrypt'

export class UserService {

    // Statik Test Personel Ekleme
    async createUserStatic() {

        const hashedPassword = await hashPassword("123456")

        const result = await pool.query(
            `INSERT INTO users (
                fullname,
                business_email,
                password,
                department_id,
                role_id,
                birthday,
                tc_no,
                individual_email,
                birthplace,
                gender_id,
                marital_status_id,
                phone,
                business_phone,
                address,
                city_id,
                district_id,
                starting_work,
                employee_status_id
            )
            VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
                $11,$12,$13,$14,$15,$16,$17,$18
            )
            RETURNING *`,
            [
                "Selimcan Gürsu",
                "selimcangursu@wikywatch.com",
                hashedPassword,
                1,
                1,
                "1998-09-13",
                "12345678901",
                "selimcangursu@yandex.com",
                "İstanbul",
                1,
                1,
                "05300805690",
                "05300805690",
                "Esenşehir Mahallesi",
                34,
                55,
                "2021-09-15",
                1
            ]
        )

        return result.rows[0]
    }
    // Kullanıcı Ekleme

    // Kullanıcı Listeleme

    // Kullanıcı Detay

    // Kullanıcı Silme

    // Kullanıcı Güncelleme

    // Kullanıcı Durum Güncelleme

    // Kullanıcı Rol Atama

    // Kullanıcı Departman Atama

    // Kullanıcı Şifre Güncelleme

    // Kullanıcı Arama/Filtreleme

    
}