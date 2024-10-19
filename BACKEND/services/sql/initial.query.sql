CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id SERIAL PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone_number VARCHAR(255) NOT NULL,
  customer_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_hash VARCHAR(255) NOT NULL,
  UNIQUE (customer_email)
);

CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL, 
  customer_first_name VARCHAR(255) NOT NULL,
  customer_last_name VARCHAR(255) NOT NULL,
  active_customer_status INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);

CREATE TABLE IF NOT EXISTS customer_device_identifier (
  device_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL, 
  device_model VARCHAR(255) NOT NULL,
  device_color VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);
-- to remove the unique constraint from the table use the query below
-- ALTER TABLE customer_device_identifier
-- DROP CONSTRAINT your_constraint_name;   (you can get your_constraint_name by right clicking on the table then navigate to properties and the navigate to constraints then find unique constraint)

CREATE TABLE IF NOT EXISTS customer_device_info (
  device_info_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL, 
  device_id INT NOT NULL, 
  device_make VARCHAR(255) NOT NULL,
  device_serial_number VARCHAR(255),
  device_type VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (device_id) REFERENCES customer_device_identifier(device_id)
);

-- Company tables 
CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id SERIAL PRIMARY KEY,
  company_role_name VARCHAR(255) NOT NULL,
  UNIQUE (company_role_name)
);

CREATE TABLE IF NOT EXISTS common_repair_services (
  service_id SERIAL PRIMARY KEY,
  repair_service_name VARCHAR(255) NOT NULL,
  repair_service_description TEXT
);

-- Employee tables 
CREATE TABLE IF NOT EXISTS employee_identifier (
  employee_id SERIAL PRIMARY KEY,
  employee_email VARCHAR(255) NOT NULL,
  employee_active_status INT NOT NULL,
  employee_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (employee_email)
);

CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_first_name VARCHAR(255) NOT NULL,
  employee_last_name VARCHAR(255) NOT NULL,
  employee_phone VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee_identifier(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_password_hashed VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee_identifier(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  company_role_id INT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee_identifier(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
);

CREATE TABLE IF NOT EXISTS employee_user (
  employee_user_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_username VARCHAR(255) NOT NULL,
  employee_terminated_date TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee_identifier(employee_id),
  UNIQUE (employee_username)
);

-- Order tables  
CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  customer_id INT NOT NULL,
  device_id INT NOT NULL,
  order_hash VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee_identifier(employee_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (device_id) REFERENCES customer_device_identifier(device_id)
);

CREATE TABLE IF NOT EXISTS order_info (
  order_info_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  order_total_price MONEY NOT NULL,
  order_description TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS order_services (
  order_service_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  service_id INT NOT NULL,
  service_completed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_repair_services(service_id)
);

CREATE TABLE IF NOT EXISTS order_status (
  order_status_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  order_status VARCHAR(255) NOT NULL,
  order_number INT NOT NULL,
  active_order BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS order_dates (
  order_date_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estimated_completion_date TIMESTAMP,
  completion_date TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Additional services table
CREATE TABLE IF NOT EXISTS ria_rate_service (
  rate_service_id SERIAL PRIMARY KEY,
  rate_service_name VARCHAR(255) NOT NULL,
  added_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  rate_value NUMERIC NOT NULL
);
CREATE OR REPLACE FUNCTION update_added_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.added_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_added_date_trigger
BEFORE UPDATE ON ria_rate_service
FOR EACH ROW
EXECUTE PROCEDURE update_added_date();

CREATE TABLE IF NOT EXISTS rent_service (
  rent_service_id SERIAL PRIMARY KEY,
  rent_service_name VARCHAR(255) NOT NULL,
  owner_phoneNumber VARCHAR(255) NOT NULL,
  rent_service_description TEXT,
  rent_status INT NOT NULL,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_category VARCHAR(255) NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  product_price MONEY NOT NULL
);

CREATE TABLE IF NOT EXISTS product_info (
  product_info_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  product_description TEXT,
  product_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
