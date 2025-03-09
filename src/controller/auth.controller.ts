import { Request, Response } from "express";
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { PRODUCTS_QUERY } from "../query/products.query";
import bcrypt, { genSalt } from "bcryptjs";
import { USERS_QUERY } from '../query/users.query'
import jwt from "jsonwebtoken"
import { error } from "console";
import db from '../config/db'

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[] | {}];


export const login = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
  return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "loing get api"))

}
export const userLogin = async (req: any, res: any) => {

  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
  // const pool = await connection();
  db.query("select * from users where email= ?", [email], async (error: Error, result: any) => {
    if (error) {
      return res.status(500).send({ message: "error occured" });
    }
    if (result.length === 0) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const expirationTime=1;
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: `${expirationTime}` })
    const loggedinUser ={
      firstName:result[0].firstName,
      lastName:result[0].lastName
    }
    res.send({
      message: "Login Success", token,
      user:loggedinUser
     
    })
  })

}
