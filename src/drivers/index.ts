import { DatabaseDriver } from "./driver";
import PGLiteDriver from "./pglite";
import SQLiteDriver from "./sqlite";

const DatabaseDrivers: Record<string, DatabaseDriver> = {
  [PGLiteDriver.id]: PGLiteDriver,
  [SQLiteDriver.id]: SQLiteDriver,
  // Add more drivers here
};

export default DatabaseDrivers;
