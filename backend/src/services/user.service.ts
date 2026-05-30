import { pool } from '../config/db'
import { hashPassword } from '../utils/bcrypt'
import {RegisterDTO} from "../types/user.types"

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
    async create(newUserData : RegisterDTO )
    {

        const hashedPassword = await hashPassword("123456")

        const user = await pool.query(`INSERT INTO users (
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
            RETURNING *`,[
            newUserData.fullname,
            newUserData.business_email,
            hashedPassword,
            newUserData.department_id,
            newUserData.role_id,
            newUserData.birthday,
            newUserData.tc_no,
            newUserData.individual_email,
            newUserData.birthplace,
            newUserData.gender_id,
            newUserData.marital_status_id,
            newUserData.phone,
            newUserData.business_phone,
            newUserData.address,
            newUserData.city_id,
            newUserData.district_id,
            newUserData.starting_work,
            newUserData.employee_status_id
        ])
        return user.rows[0]
    }
    // Kullanıcı Listeleme
    async listUsers()
    {
        const users = await pool.query("SELECT * FROM users")
        return users.rows
    }
    // Kullanıcı Detay
    async userDetail(id:string)
    {
        const user = await pool.query("SELECT * FROM users WHERE id=$1",[id])
        return user.rows[0];
    }

    // Kullanıcı Silme

    // Kullanıcı Güncelleme

    // Kullanıcı Durum Güncelleme

    // Kullanıcı Rol Atama

    // Kullanıcı Departman Atama

    // Kullanıcı Şifre Güncelleme

    // Kullanıcı Arama/Filtreleme


}