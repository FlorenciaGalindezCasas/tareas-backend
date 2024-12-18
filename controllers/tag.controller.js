const { getAll } = require("../models/tag.model");

const tagController = {
  getAllTag: async (req, res) => {
    const result = await getAll();

    if (result.error) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(200).json({
      result,
    });
  },
};

module.exports = tagController;
