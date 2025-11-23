// Run the SQL from docs/supabase-schema.sql against a Postgres URL provided in SUPABASE_DB_URL
// Usage: set SUPABASE_DB_URL=<your-db-url>; node scripts/run-sql.js

const fs = require('fs');
const { Client } = require('pg');
const path = require('path');

async function main() {
  const sqlPath = path.join(__dirname, '..', 'docs', 'supabase-schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('supabase-schema.sql not found at', sqlPath);
    process.exit(1);
  }
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('Please set SUPABASE_DB_URL (the Postgres connection string) in your environment.');
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUrl });
  try {
    await client.connect();
    console.log('Connected to database, executing SQL...');
    await client.query(sql);
    console.log('SQL executed successfully.');
  } catch (err) {
    console.error('Failed to execute SQL:', err.message || err);
    process.exitCode = 2;
  } finally {
    await client.end();
  }
}

main();
