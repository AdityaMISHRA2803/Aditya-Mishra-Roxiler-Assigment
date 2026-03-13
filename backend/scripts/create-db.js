require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main(){
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = process.env.DB_PORT || 3306;
  const DB_USER = process.env.DB_USER || 'root';
  const DB_PASS = process.env.DB_PASS || '';
  const DB_NAME = process.env.DB_NAME || 'store_ratings';

  const sqlPath = path.resolve(__dirname, '..', '..', 'sql', 'schema.sql');
  if (!fs.existsSync(sqlPath)){
    console.error('schema.sql not found at', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Connecting to MySQL server...');
  const conn = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, multipleStatements: true });
  try{
    console.log(`Creating database '${DB_NAME}' if it does not exist...`);
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
    console.log('Importing schema from', sqlPath);
    // run the full schema file; it includes USE statement
    await conn.query(sql);
    console.log('Database ready.');
    process.exit(0);
  }catch(err){
    console.error('Error creating database:', err.message || err);
    process.exit(2);
  }finally{
    await conn.end();
  }
}

main();
