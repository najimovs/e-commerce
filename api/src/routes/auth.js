import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { executeQuery } from "#utils/db.js"

const router = Router()

router.post( "/login", async ( req, res ) => {

	const { username, password } = req.body

	if ( !username || !password ) {

		res.status( 400 ).send( {
			message: "username, password must include body",
		} )

		return
	}

	const [ user ] = await executeQuery( "select id, password from users where username = $1", username )

	if ( !user ) {

		res.status( 401 ).send( {
			message: "Wrong username",
		} )

		return
	}

	const match = await bcrypt.compare( password, user.password )

	if ( !match ) {

		res.status( 401 ).send( {
			message: "Wrong password",
		} )

		return
	}

	// JWT

	const token = jwt.sign( { userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" } )

	res.send( { message: "ok", token, username } )
} )

export default router
