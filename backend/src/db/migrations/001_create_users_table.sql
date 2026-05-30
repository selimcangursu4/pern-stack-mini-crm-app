CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    fullname VARCHAR(100) NOT NULL,
    business_email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    department_id INT,
    role_id INT,
    birthday DATE,
    tc_no VARCHAR(255),
    individual_email VARCHAR(255),
    birthplace VARCHAR(255),
    gender_id INT,
    marital_status_id VARCHAR(20),
    phone VARCHAR(30),
    business_phone VARCHAR(30),
    address TEXT,
    city_id INT,
    district_id INT,
    starting_work DATE,
    date_of_leaving DATE,
    employee_status_id VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);