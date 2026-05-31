CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    process VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

