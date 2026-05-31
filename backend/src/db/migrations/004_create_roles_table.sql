CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    status_id INT,
    created_at TIMESTAMP DEFAULT NOW()
);

