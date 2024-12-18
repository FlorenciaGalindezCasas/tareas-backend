const express = require("express");
const router = express.Router();
const { getAllTag } = require("../controllers/tag.controller");
const { createTag, deleteTag } = require("../models/tag.model");
const { requireLogin } = require("../middlewares/auth");

router.get("/", getAllTag);
router.post("/newtag", requireLogin, async (req, res) => {
  try {
    const tagData = req.body;

    console.log("Datos del tag:", tagData);

    const createdTag = await createTag(tagData);

    console.log("Tag creado:", createdTag);

    res.json(createdTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error" });
  }
});
router.delete("/deletetag/:id", requireLogin, async (req, res) => {
  try {
    const tagId = req.params.id;
    console.log(tagId);

    const deletedTag = await deleteTag(tagId);

    res.json({ success: true, message: "Successfully deleted note" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error" });
  }
});

module.exports = router;
