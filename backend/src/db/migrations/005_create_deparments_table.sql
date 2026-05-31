CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    status_id INT,
    created_at TIMESTAMP DEFAULT NOW()
);

