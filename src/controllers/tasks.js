import { validationResult } from "express-validator";
import { Project, Task } from "../models";

export const getTasks = async (req, res, next) => {
  try {
    const { project } = req.body;
    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ message: "Could not find project." });

    if (projectExists.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    const tasks = await Task.find({ project });

    return res.json({ message: "Tasks fetched successfully.", tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not create project.", errors: errors.array() });

  try {
    const { project } = req.body;
    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ message: "Could not find project." });

    if (projectExists.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    const task = new Task(req.body);
    await task.save();

    return res.json({ message: "Task created successfully.", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not update project.", errors: errors.array() });

  try {
    const { project, name, completed } = req.body;
    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ message: "Could not find project." });

    if (projectExists.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    const taskExists = await Task.findById(req.params.id);

    if (!taskExists)
      return res.status(404).json({ message: "Could not find task." });

    let task = {};

    if (name) task.name = name;
    if (completed) task.completed = completed;

    task = await Task.findOneAndUpdate({ _id: req.params.id }, task, {
      new: true,
    });

    return res.json({ message: "Task updated successfully.", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { project } = req.body;
    const projectExists = await Project.findById(project);

    if (!projectExists)
      return res.status(404).json({ message: "Could not find project." });

    if (projectExists.createdBy.toString() !== req.user.id)
      return res.status(404).json({ message: "Not authorized." });

    const taskExists = await Task.findById(req.params.id);

    if (!taskExists)
      return res.status(404).json({ message: "Could not find task." });

    await Task.findOneAndRemove({ _id: req.params.id });

    return res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
