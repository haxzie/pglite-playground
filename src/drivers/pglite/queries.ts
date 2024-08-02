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
