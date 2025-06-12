import express from 'express'
import  isAuth  from '../middlewares/isAuth.js'
import { getCurrentUser } from '../controllers/user.controllers.js'

const userRouter=express.Router()


userRouter.post("/current",isAuth,getCurrentUser)

export default userRouter