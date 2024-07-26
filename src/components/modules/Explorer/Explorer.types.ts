export interface DBTable {
  name: string;
  schema: string;
  columns: Array<{
    name: string;
    type: string;
  }>;
}

export type DBSchema = Record<string, DBTable>;

export interface RowSchema {
  table_name: string;
  column_name: string;
  data_type: string;
  character_maximum_length: number;
  numeric_precision: number;
  numeric_scale: number;
  is_nullable: string;
}
