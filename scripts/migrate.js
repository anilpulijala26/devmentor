const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove surrounding quotes if any
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DATABASE_URL is not defined in the environment or .env file.");
  process.exit(1);
}

async function runMigration() {
  const dbUrl = new URL(connectionString);
  const targetDbName = dbUrl.pathname.slice(1) || 'codenivra';
  dbUrl.pathname = '/postgres';
  const defaultConnectionString = dbUrl.toString();

  console.log(`Checking if database "${targetDbName}" exists...`);
  const adminClient = new Client({ connectionString: defaultConnectionString });
  
  try {
    await adminClient.connect();
    
    // Check if target DB exists
    const res = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDbName]
    );
    
    if (res.rows.length === 0) {
      console.log(`Database "${targetDbName}" does not exist. Creating it...`);
      await adminClient.query(`CREATE DATABASE ${targetDbName}`);
      console.log(`Database "${targetDbName}" created successfully.`);
    } else {
      console.log(`Database "${targetDbName}" already exists.`);
    }
  } catch (err) {
    console.error("Error checking/creating database:", err);
    process.exit(1);
  } finally {
    await adminClient.end();
  }

  // Connect to target DB and execute all migrations
  console.log(`Connecting to database "${targetDbName}"...`);
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected successfully. Finding migration files...");
    
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log("No migrations directory found.");
      process.exit(0);
    }
    
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort alphabetically (e.g. 01_init_auth.sql, 02_learning_progress.sql)
      
    if (files.length === 0) {
      console.log("No migration .sql files found.");
      process.exit(0);
    }
    
    console.log(`Found ${files.length} migration files. Executing in sequence...`);
    
    for (const file of files) {
      console.log(`----------------------------------------`);
      console.log(`Executing migration: ${file}`);
      const sqlPath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      
      await client.query(sql);
      console.log(`Finished executing: ${file}`);
    }
    
    console.log(`----------------------------------------`);
    console.log("All migrations executed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
