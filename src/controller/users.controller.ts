import { Request, Response } from "express";
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { connection } from '../config/mysql.config';
import { HttpResponse } from '../domain/response';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { PRODUCTS_QUERY } from "../query/products.query";
import bcrypt, { genSalt } from "bcryptjs";
import { USERS_QUERY } from '../query/users.query'

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]|{}];




// for testing

export const getUsers = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(USERS_QUERY.SELECT_USERS);
    return res.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Users  retrieved', result[0]));
  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};


export const creatUsers = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
  
  try {
    const salt=await bcrypt.genSalt(10);
   
    let email=req.body.email;
    let password=await bcrypt.hash(req.body.password,salt);
    let user = { ...req.body,password:password };
    
    console.log("hasshed password",password,user);
    const pool = await connection();
    const email1:ResultSet = await pool.query(`select count(*) as count from users where email like '${email}'`);
    const email2 = email1[0] as RowDataPacket[];
    console.log(email2[0].count, "E,mail....")
    const uniqueEmail=parseInt(email2[0].count);
    console.log
    if (uniqueEmail > 0) {
      // console.log(email1,"Email oneeeeeeee");
      return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "User Already Exists"))
    }
    else {
      const result: ResultSet = await pool.query(USERS_QUERY.CREATE_USERS, Object.values(user));
      // user = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
      return res.status(Code.CREATED)
        .send(new HttpResponse(Code.CREATED, Status.CREATED, 'User Created', user.data));
    }

  } catch (error: unknown) {
    console.error(error);
    return res.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
  }
};

