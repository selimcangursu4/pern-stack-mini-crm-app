import { pool } from '../config/db'
import { CreateDepartmentDTO, UpdateDepartmentDTO } from '../types/departments.types'

export class DepartmentService {

    // Departman Ekle
    async create(formData: CreateDepartmentDTO) {
        const department = await pool.query(
            `INSERT INTO departments (name, description, status_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [formData.name, formData.description, formData.status_id]
        );

        return department.rows[0];
    }

    // Departman Listele
    async fetch() {
        const departments = await pool.query(
            `SELECT * FROM departments ORDER BY id DESC`
        );

        return departments.rows;
    }

    // Departman Detay
    async detail(id: string) {
        const department = await pool.query(
            `SELECT * FROM departments WHERE id = $1`,
            [id]
        );

        return department.rows[0];
    }

    // Departman Güncelle
    async update(id: string, formData: UpdateDepartmentDTO) {
        const department = await pool.query(
            `UPDATE departments
             SET name = $1,
                 description = $2,
                 status_id = $3
             WHERE id = $4
             RETURNING *`,
            [formData.name, formData.description, formData.status_id, id]
        );

        return department.rows[0];
    }

    // Departman Sil
    async remove(id: string) {
        const department = await pool.query(
            `DELETE FROM departments
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        return department.rows[0];
    }

    // Departman Durum Güncelle
    async statusUpdate(id: string, departmentStatusId: number) {
        const department = await pool.query(
            `UPDATE departments
             SET status_id = $1
             WHERE id = $2
             RETURNING *`,
            [departmentStatusId, id]
        );

        return department.rows[0];
    }
}