import express from "express";
import { auth, projects, users } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(express.json({ extended: true }));

  app.use("/api/auth", auth);

  app.use("/api", projects);

  app.use("/api", users);

  return app;
};
