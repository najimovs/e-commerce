import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { executeQuery } from "#utils/db.js"
import { Client } from "pg"

const __dirname = path.dirname( fileURLToPath( import.meta.url ) )

let client = new Client( {
	user: "postgres",
	password: "math",
	host: "localhost",
	port: 5432,
	database: "postgres",
} )

try {

	await client.connect()

	// CLEANUP
	await client.query( `drop database if exists e_commerce_app` )

	// CREATE DATABASE
	await client.query( `create database e_commerce_app` )

	client.end()

	// NEW CONNECTION
	client = new Client( {
		user: "postgres",
		password: "math",
		host: "localhost",
		port: 5432,
		database: "e_commerce_app",
	} )

	fs.readFile( path.join( __dirname, "schema.sql" ), "utf8", async ( err, schemaSQL ) => {

		await client.connect()

		try {

			if ( err === null ) {

				await client.query( schemaSQL )
			}
		}
		finally {

			client.end()

			console.log( "Created!" )

			process.exit( 0 )
		}
	} )
}
catch( err ) {

	console.log( err )
}
