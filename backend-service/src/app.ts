import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import todoRoute from "./routes/todoRoutes";
import postRoute from "./routes/postRoutes";
import { delayMiddleware } from "./middlewares/delayMiddleware";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(delayMiddleware);

app.use("/api/todos", todoRoute);
app.use("/api/posts", postRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
