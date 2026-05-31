CREATE TABLE customer_notes (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT NOW()
);

