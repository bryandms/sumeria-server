import { Router } from "express";
import { check } from "express-validator";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers";
import { isAuth } from "../middleware";

const router = Router();

// GET /api/tasks
router.get("/tasks", isAuth, getTasks);

// POST /api/tasks
router.post(
  "/tasks",
  isAuth,
  [
    check("name", "The name field is required.").trim().not().isEmpty(),
    check("project", "The project field is required.").trim().not().isEmpty(),
  ],
  createTask
);

// PUT /api/tasks
router.put(
  "/tasks/:id",
  isAuth,
  [check("project", "The project field is required.").trim().not().isEmpty()],
  updateTask
);

// DELETE /api/tasks/:id
router.delete("/tasks/:id", isAuth, deleteTask);

export { router as tasks };
