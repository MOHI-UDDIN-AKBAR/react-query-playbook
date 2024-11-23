import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

const PORT = 3000;
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(next, 500);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
