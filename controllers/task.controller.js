const { getAll } = require("../models/task.model");

const taskController = {
  getAllTasks: async (req, res) => {
    const result = await getAll();

    if (result.error) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(200).json({ result });
  },
};

module.exports = taskController;
