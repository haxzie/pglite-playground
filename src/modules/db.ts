import { PGlite } from "@electric-sql/pglite";

export const getDb = (database: string) => {
    return new PGlite(`idb://${database}`);
}
