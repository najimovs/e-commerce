import express from "express"
import cors from "cors"
import * as CONFIG from "./CONFIG.js"
import { executeQuery } from "./db.js"

const server = express()

server.use( cors() )
server.use( express.json() )

server.get( "/categories", async ( _, res ) => {

	const query = `
	select
		c.name name,
		count(p.c_id)::int count_of_products
	from products p
	join categories c on c.id = p.c_id
	group by c.id`

	try {

		res.send( await executeQuery( query ) )
	}
	catch( err ) {

		console.error( err )

		res.status( 500 ).end()
	}
} )

server.get( "/products/:cid", async ( req, res ) => {

	const categoryID = parseInt( req.params.cid || 0 ) || 0
	const page = parseInt( req.query.page || 1 ) || 1

	const query = `
		select
			distinct( name ),
			price,
			img_url
		from products
		where c_id = $1
		limit $2 offset $3;
	`

	try {

		const limit = CONFIG.PRODUCT_ITEMS_PER_PAGE
		const offset = ( page - 1 ) * limit

		res.send( await executeQuery( query, categoryID, limit, offset ) )
	}
	catch( err ) {

		console.error( err )

		res.status( 500 ).end()
	}
} )

server.get( "/health", ( _, res ) => res.send( {
	ok: true,
} ) )

server.listen( 4_000, () => console.info( ":4000" ) )
