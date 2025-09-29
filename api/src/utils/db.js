import { Pool } from "pg"

const pool = new Pool( {
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PWD,
	port: process.env.PG_PORT,
	database: process.env.PG_DB,
	max: 20,
	idleTimeoutMillis: 30_000,
	connectionTimeoutMillis: 2_000,
} )

let client = null

export async function executeQuery( sql, ...data ) {

	try {

		client = await pool.connect()

		const result = await client.query( sql, data )

		return result.rows
	}
	finally {

		client.release()
	}
}
