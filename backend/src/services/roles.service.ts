import { pool } from '../config/db'
import { CreateRoleDTO, UpdateRoleDTO } from '../types/roles.types'

export class RoleService {
    // Rol Ekle
    async create(formData: CreateRoleDTO) {
        const newRole = await pool.query("INSERT INTO roles (role_name,description,status_id) VALUES($1,$2,$3) RETURNING *", [formData.role_name, formData.description, formData.status_id]);
        return newRole.rows[0];
    }
    // Rolleri Listele
    async fetch() {
        const roles = await pool.query("SELECT * FROM roles")
        return roles.rows
    }
    // Rol Detay
    async detail(id: String) {
        const role = await pool.query("SELECT * FROM roles WHERE id=$1", [id])
        return role.rows[0];
    }
    // Rol Sil
    async remove(id: string) {
        const role = await pool.query(
            "DELETE FROM roles WHERE id = $1 RETURNING *",
            [id]
        );

        return role.rows[0];
    }
    // Rol Güncelleme
    async update(id: string, formData: UpdateRoleDTO) {
        const role = await pool.query(
            `UPDATE roles 
             SET role_name = $1,
                 description = $2,
                 status_id = $3
             WHERE id = $4
             RETURNING *`,
            [formData.role_name, formData.description, formData.status_id, id]
        );

        return role.rows[0];
    }
    // Rol Durumunu Güncelle
    async roleStatusUpdate(id: string, statusId: number) {
        const role = await pool.query(
            `UPDATE roles 
         SET status_id = $1
         WHERE id = $2
         RETURNING *`,
            [statusId, id]
        );

        return role.rows[0];
    }


}