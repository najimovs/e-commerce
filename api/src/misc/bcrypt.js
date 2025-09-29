import bcrypt from "bcrypt"

const saltRounds = 10
const password = "math"

bcrypt.hash( password, saltRounds, function( err, hash ) {

	if ( !err ) {

		console.log( hash )
	}
	else {

		console.error( err )
	}
} )
