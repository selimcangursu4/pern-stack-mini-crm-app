CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    agent_id INT,
    data_status_id INT,
    data_source_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);