import { Router } from "express"
import { executeQuery } from "#utils/db.js"

const router = Router()

router.get( "/health", ( _, res ) => res.send( { ok: true } ) )

export default router
