import { Pool, QueryResult, QueryResultRow } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined.");
}

const pool =
  globalThis.pgPool ||
  new Pool({
    connectionString,
    max: 10, // maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.pgPool = pool;
}

export async function dbQuery<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      console.log("[DB Query]", { text, duration: `${duration}ms`, rows: res.rowCount });
    }
    return res;
  } catch (error: any) {
    console.error("[DB Query Error] Query failed:", text);
    console.error("[DB Query Error] Details:", {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
      hint: error?.hint,
      stack: error?.stack,
    });
    throw error;
  }
}

export default pool;

const tableExistsCache = new Map<string, boolean>();

export async function dbTableExists(tableName: string, useCache = true) {
  const normalizedName = tableName.includes(".") ? tableName : `public.${tableName}`;

  if (useCache && tableExistsCache.has(normalizedName)) {
    return tableExistsCache.get(normalizedName) ?? false;
  }

  const result = await pool.query<{ regclass: string | null }>(
    "SELECT to_regclass($1) as regclass",
    [normalizedName],
  );

  const exists = !!result.rows[0]?.regclass;
  if (useCache) {
    tableExistsCache.set(normalizedName, exists);
  }

  return exists;
}
