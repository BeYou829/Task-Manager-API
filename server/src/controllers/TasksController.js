const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/customError");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, tasks: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError(`Task not found on id: ${id}`, 404));
  }
  res.status(200).json({ success: true, data: task });
});

const updateTaskById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const task = await Task.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task not found on id: ${id}`, 404));
  }
  res.status(200).json({ success: true, task: task });
});

const deleteTaskById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(createCustomError(`Task not found on id: ${id}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
