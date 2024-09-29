import {Router} from 'express'
const router=Router()
import {postCat} from '../controllers/category.controller'

router.post('/category',postCat)

export default router