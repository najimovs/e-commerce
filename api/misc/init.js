import { executeQuery } from "./db.js"

try {

	executeQuery( `CREATE DATABASE ec2` )

	console.log( "OK")
}
catch( err ) {

	console.log( err )
}
