import express from "express"
import { checkAuth, login, singup, updateProfile } from "../controllers/userControllers.js"
import { productRoute } from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/singup",singup)

userRouter.post("/login",login)

userRouter.put("/update-profile",productRoute,updateProfile)
userRouter.get("/check",productRoute,checkAuth)


export default userRouter;

