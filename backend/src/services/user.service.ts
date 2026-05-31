import { pool } from '../config/db'
import { hashPassword } from '../utils/bcrypt'
import {RegisterDTO,UpdateUserDTO,SearchUserDTO} from "../types/user.types"

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

        const hashedPassword = await hashPassword(newUserData.password)

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
    async removeUser(id:String)
    {
        const user = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        )
        return user.rows[0]
    }
    // Kullanıcı Güncelleme
    async update(id:String,updateFormData : UpdateUserDTO )
    {
        const user = await pool.query(
            `UPDATE users 
             SET 
                fullname = $1,
                business_email = $2,
                birthday = $3,
                tc_no = $4,
                individual_email = $5,
                birthplace = $6,
                gender_id = $7,
                marital_status_id = $8,
                phone = $9,
                business_phone = $10,
                address = $11,
                city_id = $12,
                district_id = $13,
                starting_work = $14,
                date_of_leaving = $15
             WHERE id = $16
             RETURNING *`,
            [
                updateFormData.fullname,
                updateFormData.business_email,
                updateFormData.birthday,
                updateFormData.tc_no,
                updateFormData.individual_email,
                updateFormData.birthplace,
                updateFormData.gender_id,
                updateFormData.marital_status_id,
                updateFormData.phone,
                updateFormData.business_phone,
                updateFormData.address,
                updateFormData.city_id,
                updateFormData.district_id,
                updateFormData.starting_work,
                updateFormData.date_of_leaving,
                id
            ]
        )
        return user.rows[0];
    }
    // Kullanıcı Durum Güncelleme
    async statusUpdate(id:String,statusId : string)
    {
        const status = await pool.query("UPDATE users SET employee_status_id=$1 WHERE  id=$2 RETURNING * ",[statusId,id]);
        return status.rows[0];
    }
    // Kullanıcı Rol Atama
    async userRoleUpdate(id:String,roleId:string)
    {
        const role = await pool.query("UPDATE users SET role_id = $1 WHERE id=$2 RETURNING *",[roleId,id])
        return role.rows[0];
    }
    // Kullanıcı Departman Atama
    async userDepartmentUpdate(id:String,department_id:String)
    {
        const role = await pool.query("UPDATE users SET department_id = $1 WHERE id=$2 RETURNING *",[department_id,id])
        return role.rows[0];
    }
    // Kullanıcı Şifre Güncelleme
    async changePassword(id:string,password:string)
    {
        const hashedPassword = await hashPassword(password);

        const role = await pool.query("UPDATE users SET password = $1 WHERE id=$2 RETURNING *",[hashedPassword,id])
        return role.rows[0];
    }
    // Kullanıcı Arama/Filtreleme
    async search(searchData: SearchUserDTO) {

        let query = "SELECT * FROM users WHERE 1=1";
        const values: any[] = [];
        let index = 1;
    
        if (searchData.id) {
            query += ` AND id = $${index++}`;
            values.push(searchData.id);
        }
    
        if (searchData.fullname) {
            query += ` AND fullname ILIKE $${index++}`;
            values.push(`%${searchData.fullname}%`);
        }
    
        if (searchData.department_id) {
            query += ` AND department_id = $${index++}`;
            values.push(searchData.department_id);
        }
    
        if (searchData.role_id) {
            query += ` AND role_id = $${index++}`;
            values.push(searchData.role_id);
        }
    
        if (searchData.gender_id) {
            query += ` AND gender_id = $${index++}`;
            values.push(searchData.gender_id);
        }
    
        if (searchData.phone) {
            query += ` AND phone ILIKE $${index++}`;
            values.push(`%${searchData.phone}%`);
        }
    
        if (searchData.business_phone) {
            query += ` AND business_phone ILIKE $${index++}`;
            values.push(`%${searchData.business_phone}%`);
        }
    
        if (searchData.employee_status_id) {
            query += ` AND employee_status_id = $${index++}`;
            values.push(searchData.employee_status_id);
        }
    
        if (searchData.starting_work) {
            query += ` AND starting_work = $${index++}`;
            values.push(searchData.starting_work);
        }
    
        if (searchData.date_of_leaving) {
            query += ` AND date_of_leaving = $${index++}`;
            values.push(searchData.date_of_leaving);
        }
    
        const result = await pool.query(query, values);
    
        return result.rows;
    }


}