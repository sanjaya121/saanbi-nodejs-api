import { Router } from "express";
import { execPath } from "process";

import { getCategoreis } from "../controller/categories.controller";
const categoriesRoutes = Router();

categoriesRoutes.route('/')
  .get(getCategoreis)
//   .post(createPatient);

// patientRoutes.route('/:patientId')
//   .get(getPatient)
  
//   .put(updatePatient)
//   .delete(deletePatient);
export default categoriesRoutes;