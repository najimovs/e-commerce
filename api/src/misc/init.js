import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { executeQuery } from "#utils/db.js"
import { Client } from "pg"

// CONSTANTS
const __dirname = path.dirname( fileURLToPath( import.meta.url ) )

// DB CLIENT (POSTGRES)
let client = new Client( {
	user: "postgres",
	password: "math",
	host: "localhost",
	port: 5432,
	database: "postgres",
} )

// INIT
await init()

async function init() {

	try {

		await client.connect()

		// CLEANUP
		await client.query( `drop database if exists e_commerce_app` )

		// CREATE DATABASE
		await client.query( `create database e_commerce_app` )

		console.log( "Database created!" )

		// New connection
		client = new Client( {
			user: "postgres",
			password: "math",
			host: "localhost",
			port: 5432,
			database: "e_commerce_app",
		} )

		await client.connect()

		// Create scheme
		const schemeSQL = await fs.readFile( path.join( __dirname, "schema.sql" ), "utf8" )
		await client.query( schemeSQL )
		console.log( "Tables created!" )

		// Create scheme
		const dataSQL = await fs.readFile( path.join( __dirname, "data.sql" ), "utf8" )
		await client.query( dataSQL )
		console.log( "Data inserted!" )
	}
	catch( error ) {

		console.error( error )
		process.exit( 1 )
	}
	finally {

		client.end()
		process.exit( 0 )
	}
}
