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
