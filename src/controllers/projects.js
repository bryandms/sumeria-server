import { validationResult } from "express-validator";
import { Project } from "../models";

export const getProjects = async (req, res, next) => {
  try {
    let projects = await Project.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    return res.json({ message: "Projects fetched successfully.", projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const createProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not create project.", errors: errors.array() });

  try {
    let project = new Project(req.body);
    project.createdBy = req.user.id;
    await project.save();

    return res.json({ message: "Project created successfully.", project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const updateProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not create project.", errors: errors.array() });

  try {
    const { name } = req.body;
    const newProject = {};

    if (name) newProject.name = name;

    let project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Could not find project." });

    if (project.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    return res.json({ message: "Project updated successfully.", project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project)
      return res.status(404).json({ message: "Could not find project." });

    if (project.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    project = await Project.findOneAndRemove({ _id: req.params.id });

    return res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
