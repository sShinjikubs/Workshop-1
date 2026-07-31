const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://neondb_owner:npg_aSYsFvV0d5UG@ep-lingering-recipe-azo96be6-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  console.log('Testing connection & dropping legacy tables in new Neon Postgres...');
  const client = await pool.connect();
  console.log('✅ Connected successfully!');

  const dbPath = path.join(__dirname, 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  try {
    // Drop all old tables to ensure exact schema match
    await client.query(`
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS logs CASCADE;
      DROP TABLE IF EXISTS blacklist CASCADE;
      DROP TABLE IF EXISTS pending_watches CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS profiles CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log('✅ Dropped legacy tables successfully!');

    // 1. Users Table
    await client.query(`
      CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL
      )
    `);

    // 2. Profiles Table
    await client.query(`
      CREATE TABLE profiles (
        username VARCHAR(50) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
        firstname VARCHAR(50),
        lastname VARCHAR(50),
        email VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        avatar TEXT
      )
    `);

    // 3. Products Table
    await client.query(`
      CREATE TABLE products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        brand VARCHAR(50) NOT NULL,
        category VARCHAR(50),
        price NUMERIC(12, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        color VARCHAR(50),
        stroke_color VARCHAR(50),
        is_gold_face BOOLEAN DEFAULT FALSE,
        image VARCHAR(255),
        image_back VARCHAR(255)
      )
    `);

    // 4. Orders Table
    await client.query(`
      CREATE TABLE orders (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        items JSONB NOT NULL,
        total NUMERIC(12, 2) NOT NULL,
        email VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        payment VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL,
        date VARCHAR(50) NOT NULL,
        slip TEXT
      )
    `);

    // 5. Pending Watches Table
    await client.query(`
      CREATE TABLE pending_watches (
        id VARCHAR(50) PRIMARY KEY,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(100) NOT NULL,
        price NUMERIC(12, 2) NOT NULL,
        proposed_banding VARCHAR(50) NOT NULL,
        dial_color VARCHAR(50),
        description TEXT,
        seller_name VARCHAR(100) NOT NULL,
        seller_email VARCHAR(100) NOT NULL,
        inspection_status VARCHAR(20) DEFAULT 'pending',
        import_status VARCHAR(20) DEFAULT 'pending',
        date VARCHAR(50) NOT NULL
      )
    `);

    // 6. Blacklist Table
    await client.query(`
      CREATE TABLE blacklist (
        email VARCHAR(100) PRIMARY KEY,
        national_id VARCHAR(50) NOT NULL,
        reason TEXT
      )
    `);

    // 7. Logs Table
    await client.query(`
      CREATE TABLE logs (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        message TEXT NOT NULL
      )
    `);

    // 8. Reviews Table
    await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created exact database.ts schema tables!');

    // Seed Users
    for (const u of dbData.users) {
      await client.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, $3)`,
        [u.username, u.password, u.role]
      );
    }

    // Seed Products
    for (const p of dbData.products) {
      await client.query(
        `INSERT INTO products (id, name, name_en, brand, price, stock, image, category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [p.id, p.name, p.nameEn || p.name, p.brand, p.price, p.stock, p.image, p.category || 'audio']
      );
    }

    console.log('🎉 Seeded new Neon Postgres Database successfully with all 13 products and matching schema!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    client.release();
    pool.end();
  }
}

initDatabase();
