import { pool } from '../config/db';
import {
    CreateCustomerDTO,
    UpdateCustomerDTO,
    CustomerFilterDTO
} from '../types/customer.types';

export class CustomerService {

    // Yeni Müşteri Ekle
    async createCustomer(data: CreateCustomerDTO) {
        const result = await pool.query(
            `INSERT INTO customers 
            (fullname, email, phone, address, city, country, agent_id, data_status_id, data_source_id, notes)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *`,
            [
                data.fullname,
                data.email,
                data.phone,
                data.address,
                data.city,
                data.country,
                data.agent_id,
                data.data_status_id,
                data.data_source_id,
                data.notes
            ]
        );

        return result.rows[0];
    }
    //  Müşterileri Listele (filter + search + pagination)
    async getCustomers(filter: CustomerFilterDTO) {
        let query = `SELECT * FROM customers WHERE 1=1`;
        const values: any[] = [];
        let i = 1;

        if (filter.search) {
            query += ` AND (fullname ILIKE $${i} OR email ILIKE $${i} OR phone ILIKE $${i})`;
            values.push(`%${filter.search}%`);
            i++;
        }

        if (filter.city) {
            query += ` AND city = $${i}`;
            values.push(filter.city);
            i++;
        }

        if (filter.country) {
            query += ` AND country = $${i}`;
            values.push(filter.country);
            i++;
        }

        if (filter.agent_id) {
            query += ` AND agent_id = $${i}`;
            values.push(filter.agent_id);
            i++;
        }

        if (filter.data_status_id) {
            query += ` AND data_status_id = $${i}`;
            values.push(filter.data_status_id);
            i++;
        }

        query += ` ORDER BY created_at DESC`;

        if (filter.limit) {
            query += ` LIMIT $${i}`;
            values.push(filter.limit);
            i++;
        }

        if (filter.offset) {
            query += ` OFFSET $${i}`;
            values.push(filter.offset);
        }

        const result = await pool.query(query, values);
        return result.rows;
    }
    //  Müşteri Detay
    async getCustomerById(id: number) {
        const result = await pool.query(
            `SELECT * FROM customers WHERE id = $1`,
            [id]
        );

        return result.rows[0];
    }
    //  Müşteri Güncelle
    async updateCustomer(id: number, data: UpdateCustomerDTO) {
        const fields: string[] = [];
        const values: any[] = [];
        let i = 1;

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = $${i}`);
                values.push(value);
                i++;
            }
        });

        values.push(id);

        const query = `
            UPDATE customers 
            SET ${fields.join(', ')}, updated_at = NOW()
            WHERE id = $${i}
            RETURNING *
        `;

        const result = await pool.query(query, values);
        return result.rows[0];
    }
    // Müşteri Sil (soft delete önerilir)
    async deleteCustomer(id: number) {
        const result = await pool.query(
            `DELETE FROM customers WHERE id = $1 RETURNING *`,
            [id]
        );

        return result.rows[0];
    }
    // Müşteri Ara
    async searchCustomer(search: string) {
        const result = await pool.query(
            `SELECT * FROM customers 
             WHERE fullname ILIKE $1 
             OR email ILIKE $1 
             OR phone ILIKE $1`,
            [`%${search}%`]
        );

        return result.rows;
    }
    // Agent değiştir
    async changeAgent(customerId: number, agentId: number) {
        const result = await pool.query(
            `UPDATE customers 
             SET agent_id = $1, updated_at = NOW()
             WHERE id = $2
             RETURNING *`,
            [agentId, customerId]
        );

        return result.rows[0];
    }
    // Müşteri Notu Ekle
    async createNote(
        customerId: number,
        description: string,
        userId: number
    ) {
        const result = await pool.query(
            `INSERT INTO customer_notes
        (customer_id, description, user_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
            [customerId, description, userId]
        );

        return result.rows[0];
    }

}