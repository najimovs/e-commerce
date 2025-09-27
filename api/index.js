import express from "express"
import cors from "cors"

const server = express()

server.use( cors() )
server.use( express.json() )

server.get( "/categories", ( _, res ) => {

	res.send( [
		{
			name: "Sports & Outdoors",
			count_of_products: 1,
		},
	] )
} )

server.get( "/products/:cid", ( req, res ) => {

	console.log( req.params.cid )

	res.send( [
		{
			name: "Sony WH-1000XM5 Headphones",
			price: 250,
			img_url: "/images/no_image.png",
		},
	] )
} )

server.get( "/health", ( _, res ) => res.send( {
	ok: true,
} ) )

server.listen( 4_000, () => console.info( ":4000" ) )
