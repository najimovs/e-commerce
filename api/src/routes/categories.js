import { Router } from "express"
import jwt from "jsonwebtoken"
import { executeQuery } from "#utils/db.js"

const router = Router()

router.get( "/", async ( _, res ) => {

	const query = `
	select
		c.name name,
		count(p.category_id)::int count_of_products
	from products p
	join categories c on c.id = p.category_id
	group by c.id`

	try {

		res.send( await executeQuery( query ) )
	}
	catch( err ) {

		console.error( err )

		res.status( 500 ).end()
	}
} )

router.post( "/", async ( req, res ) => {

	const { access_token } = req.headers
	const { name } = req.body

	if ( !name ) {

		res.status( 400 ).send( { message: "name must include in body" } )
		return
	}

	if ( !access_token ) {

		res.status( 401 ).end()
		return
	}

	try {

		const { userId } = await jwt.verify( req.headers.access_token, process.env.JWT_SECRET )

		const [ allowed ] = await executeQuery( "select rights from permissions where user_id = $1 and rights = 1", userId )

		if ( !allowed ) {

			res.status( 403 ).end()
			return
		}

		try {

			await executeQuery( "insert into categories (name) values ($1)", name )

			res.status( 201 ).send( { message: "ok" } )
		}
		catch( error ) {

			res.status( 400 ).send( { message: error.message } )
		}
	}
	catch( error ) {

		res.status( 401 ).send( { message: error.message } )
		return
	}

	res.send( "OK" )

} )

export default router
