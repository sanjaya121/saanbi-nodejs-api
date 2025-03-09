import { Router } from "express";
import { execPath } from "process";
import { getProducts } from "../controller/products.crontroller";
const productsroutes = Router();

productsroutes.route('/')
  .get(getProducts)
//   .post(createPatient);

// patientRoutes.route('/:patientId')
//   .get(getPatient)
  
//   .put(updatePatient)
//   .delete(deletePatient);
export default productsroutes;