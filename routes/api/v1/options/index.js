const express = require("express");
const router = express.Router();

const OptionController = require("../../../../controllers/OptionController");
const optionController = new OptionController();

router.delete("/delete/", optionController.delete);
router.put("/addVote/", optionController.addVote);

module.exports = router;
