const express = require("express");
const router = express.Router();
const { getAllTasks } = require("../controllers/task.controller");
const { createTask, editTask, deleteTask } = require("../models/task.model");
const { requireLogin } = require("../middlewares/auth");

//obtener todas las tareas
router.get("/", getAllTasks);

//agregar nueva tarea
router.post("/nuevatarea", requireLogin, async (req, res) => {
  try {
    const taskData = req.body;
    console.log("Nota: ", taskData);

    const createdTask = await createTask(taskData);
    console.log("Nota creada: ", createdTask);

    res.json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).jsob({ error: true, message: "Error" });
  }
});

//editar tarea segun id
router.put("/editartarea/:id", requireLogin, async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log("ID: ", taskId);

    const updatedTask = await editTask(taskId, req.body);

    res.json(updatedTask);
    console.log("Nota editada: ", updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Error" });
  }
});

//estado de tarea
router.put("/estadotarea/:id", requireLogin, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { note_status } = req.body;

    if (typeof note_status !== "boolean") {
      return res
        .status(400)
        .json({
          error: true,
          message: "note_status debe ser un valor booleano",
        });
    }

    const updatedTask = await editTask(taskId, { note_status });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error" });
  }
});

//eliminar tarea
router.delete("/eliminartarea/:id", requireLogin, async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await deleteTask(taskId);

    res.json({ success: true, message: "Tarea eliminada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error" });
  }
});

module.exports = router;
