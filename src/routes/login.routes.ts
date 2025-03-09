import { Router } from "express";
import {login,userLogin} from "../controller/auth.controller";

const loginRoutes =Router();

loginRoutes.route('/')
.get(login)
.post(userLogin)


export default loginRoutes;