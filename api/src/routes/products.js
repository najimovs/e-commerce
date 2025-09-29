import { Router } from "express"
import { executeQuery } from "#utils/db.js"

const router = Router()

router.get( "/:cid", async ( _, res ) => {

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

export default router
