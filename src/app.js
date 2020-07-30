import express from "express";
import { users } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(express.json({ extended: true }));

  app.use("/api", users);

  return app;
};
