import { sql } from "./lib/postgres"

async function setup() {
  await sql/*sql*/`
    CREATE TABLE IF NOT EXISTS short_links (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE,
      original_url TEXT,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql.end()
  console.log('Setup completed successfully!')
}

setup()