import express from "express"
import cors from "cors"

import Common from "#routes/common.js"
import Categories from "#routes/categories.js"
import Products from "#routes/products.js"

const PORT = process.env.port || 4_000

const server = express()

server.use( cors() )
server.use( express.json() )
server.use( "/", Common )
server.use( "/categories", Categories )
server.use( "/products", Products )

server.listen( PORT, () => console.info( `Server ready at :${ PORT }` ) )
