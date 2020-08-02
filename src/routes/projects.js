import { Router } from "express";
import { check } from "express-validator";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers";
import { isAuth } from "../middleware";

const router = Router();

// GET /api/projects
router.get("/projects", isAuth, getProjects);

// POST /api/projects
router.post(
  "/projects",
  isAuth,
  [check("name", "The name field is required.").trim().not().isEmpty()],
  createProject
);

// PUT /api/projects/:id
router.put(
  "/projects/:id",
  isAuth,
  [check("name", "The name field is required.").trim().not().isEmpty()],
  updateProject
);

// DELETE /api/projects/:id
router.delete("/projects/:id", isAuth, deleteProject);

export { router as projects };
