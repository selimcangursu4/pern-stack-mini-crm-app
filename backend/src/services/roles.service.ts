import {pool} from '../config/db'
import {CreateRoleDTO} from '../types/roles.types'

export class RoleService{
    // Rol Ekle
    async create(formData:CreateRoleDTO)
    {
        const newRole = await pool.query("INSERT INTO roles (role_name,description,status_id) VALUES($1,$2,$3) RETURNING *",[formData.role_name,formData.description,formData.status_id]);
        return newRole.rows[0];
    }
    // Rolleri Listele
    async fetch()
    {
        const roles = await pool.query("SELECT * FROM roles")
        return roles.rows
    }
    // Rol Detay
    async detail(id:String)
    {
        const role = await pool.query("SELECT * FROM roles WHERE id=$1",[id])
        return role.rows[0];
    }
    // Rol Sil
    

    // Rol Güncelle

    // Rol Durumunu Güncelle


}