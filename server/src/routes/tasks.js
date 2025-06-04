const express = require("express");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/TasksController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;
