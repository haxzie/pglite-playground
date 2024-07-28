export const GET_DATABASE_SCHEMA_QUERY = `
    SELECT 
  t.table_name,
  c.column_name,
  c.data_type,
  c.character_maximum_length,
  c.numeric_precision,
  c.numeric_scale,
  c.is_nullable
FROM 
  information_schema.tables t
JOIN 
  information_schema.columns c 
  ON t.table_name = c.table_name
WHERE 
  t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
ORDER BY 
  t.table_name,
  c.ordinal_position;
  `;

export const CREATE_TABLE_QUERY = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, full_name, date_of_birth) VALUES
('johndoe', 'john.doe@email.com', 'John Doe', '1990-05-15'),
('janesmit', 'jane.smith@email.com', 'Jane Smith', '1988-09-22'),
('bobwilso', 'bob.wilson@email.com', 'Bob Wilson', '1995-03-30'),
('alicejoh', 'alice.johnson@email.com', 'Alice Johnson', '1992-11-08'),
('charlieb', 'charlie.brown@email.com', 'Charlie Brown', '1985-07-01');
`;


export const DEMO_QUERIES = `-- Welcome to PGLite explorer! This is a liteweight browser based editor to explore PGLite
-- This demo uses PGLite by ElectricSQL (https://github.com/electric-sql/pglite)
-- All the data will be stored within your browser

-- For any queries reach out to me on X(formerly twitter) at @haxzie_ (https://x.com/haxzie_)


------------------------------------
-- To try out the examples, select each query from below and hit "RUN QUERY"
------------------------------------

-- Create Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);

-- Create Orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL
);

-- Create Order_Items table (for many-to-many relationship between Orders and Products)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL
);

-- Insert sample users
INSERT INTO users (username, email, full_name) VALUES
('john_doe', 'john@example.com', 'John Doe'),
('jane_smith', 'jane@example.com', 'Jane Smith'),
('bob_jones', 'bob@example.com', 'Bob Jones'),
('alice_wonder', 'alice@example.com', 'Alice Wonder'),
('charlie_brown', 'charlie@example.com', 'Charlie Brown'),
('diana_prince', 'diana@example.com', 'Diana Prince'),
('ethan_hunt', 'ethan@example.com', 'Ethan Hunt'),
('fiona_apple', 'fiona@example.com', 'Fiona Apple'),
('george_lucas', 'george@example.com', 'George Lucas'),
('hannah_montana', 'hannah@example.com', 'Hannah Montana');

-- Insert sample products
INSERT INTO products (name, description, price, stock_quantity) VALUES
('Laptop', 'High-performance laptop', 999.99, 50),
('Smartphone', 'Latest model smartphone', 699.99, 100),
('Headphones', 'Noise-cancelling headphones', 199.99, 75),
('Tablet', '10-inch tablet', 299.99, 60),
('Smart Watch', 'Fitness tracking smartwatch', 149.99, 80),
('Camera', 'Digital SLR camera', 599.99, 30),
('Gaming Console', 'Next-gen gaming console', 499.99, 40),
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 100),
('External Hard Drive', '1TB external hard drive', 79.99, 55),
('Bluetooth Speaker', 'Portable Bluetooth speaker', 89.99, 70);

-- Insert sample orders
INSERT INTO orders (user_id, total_amount) VALUES
(1, 1199.98),
(2, 699.99),
(3, 279.98),
(4, 599.99),
(5, 149.99),
(6, 1099.98),
(7, 529.98),
(8, 199.99),
(9, 579.98),
(10, 89.99);

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price_per_unit) VALUES
(1, 1, 1, 999.99),
(1, 3, 1, 199.99),
(2, 2, 1, 699.99),
(3, 8, 1, 29.99),
(3, 10, 1, 89.99),
(4, 6, 1, 599.99),
(5, 5, 1, 149.99),
(6, 1, 1, 999.99),
(6, 4, 1, 299.99),
(7, 7, 1, 499.99),
(7, 8, 1, 29.99),
(8, 3, 1, 199.99),
(9, 6, 1, 599.99),
(9, 9, 1, 79.99),
(10, 10, 1, 89.99);

-- Get all users:
SELECT * FROM users;

-- Get all products ordered by price (descending):
SELECT * FROM products ORDER BY price DESC;

-- Get the total number of orders for each user:
SELECT u.username, COUNT(o.order_id) as order_count
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username
ORDER BY order_count DESC;

-- Get the top 5 most popular products (by quantity ordered):
SELECT p.name, SUM(oi.quantity) as total_quantity
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name
ORDER BY total_quantity DESC
LIMIT 5;


-- Get all orders with their items and product details:
SELECT o.order_id, u.username, p.name as product_name, oi.quantity, oi.price_per_unit
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id;


-- Calculate the total revenue:
SELECT SUM(total_amount) as total_revenue FROM orders;

-- Get users who have made orders totaling more than $500:
SELECT u.username, SUM(o.total_amount) as total_spent
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username
HAVING SUM(o.total_amount) > 500
ORDER BY total_spent DESC;

-- Get products with low stock (less than 50 units):
SELECT name, stock_quantity
FROM products
WHERE stock_quantity < 50
ORDER BY stock_quantity;

-- Get the average order value:
SELECT AVG(total_amount) as avg_order_value FROM orders;


-- Get the most recent order for each user:
SELECT DISTINCT ON (u.user_id)
    u.username, o.order_id, o.order_date, o.total_amount
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
ORDER BY u.user_id, o.order_date DESC NULLS LAST;

`