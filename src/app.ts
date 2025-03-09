import express, { Application } from "express";
import ip from "ip";
import cors from "cors";
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
// import patientRoutes from "./routes/patient.routes";

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING: any = "Application is running on : ";
  private readonly ROUTE_NOT_FOUND = "Route Doesnot exist";
  /**
   *
   */
  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 8080
  ) {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  // configuring api routes.

  private routes() {
    this.app.use("/categories", categoriesRoutes);
    this.app.use('/products', productsRoutes);
    this.app.use('/signup', usersRoutes);
    this.app.use('/api/v1/login',loginRoutes)
    this.app.get("/", (req, res) =>
      res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Welcome to patient API v1.0")
        )
    );


    this.app.all("*", (req, res) =>
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            this.ROUTE_NOT_FOUND
          )
        )
    );
  }
}
