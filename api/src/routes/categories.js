import { Router } from "express"
import { executeQuery } from "#utils/db.js"

const router = Router()

router.get( "/", async ( _, res ) => {

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

export default router
