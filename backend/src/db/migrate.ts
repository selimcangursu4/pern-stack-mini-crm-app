import fs from 'fs/promises';
import path from 'path';
import pool from '../config/db';

const MIGRATIONS_TABLE = 'migrations';

async function createMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      id SERIAL PRIMARY KEY,
      file_name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function getExecutedMigrations(): Promise<string[]> {
  const result = await pool.query(
    `SELECT file_name FROM ${MIGRATIONS_TABLE}`
  );

  return result.rows.map((row) => row.file_name);
}

async function runMigrations() {
  try {
    console.log('Migrationlar Çalıştırılıyor...');

    await createMigrationsTable();

    const migrationsPath = path.join(
      __dirname,
      'migrations'
    );

    const files = (await fs.readdir(migrationsPath))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    const executed = await getExecutedMigrations();

    for (const file of files) {
      if (executed.includes(file)) {
        console.log(`⏭ Skipped: ${file}`);
        continue;
      }

      const filePath = path.join(migrationsPath, file);
      const sql = await fs.readFile(filePath, 'utf-8');

      const client = await pool.connect();

      try {
        await client.query('BEGIN');

        await client.query(sql);

        await client.query(
          `
          INSERT INTO migrations (file_name)
          VALUES ($1)
        `,
          [file]
        );

        await client.query('COMMIT');

        console.log(`✅ Çalıştı : ${file}`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }

    console.log('Migrationlar Başarıyla Kaydedildi');
  } catch (error) {
    console.error('Migrationlar Kaydedilemedi Hata:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();