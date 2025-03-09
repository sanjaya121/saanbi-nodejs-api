import { Router } from "express";
import { getUsers,creatUsers} from "../controller/users.controller";

const usersRoutes =Router();

usersRoutes.route('/')
.get(getUsers)
.post(creatUsers)


export default usersRoutes;