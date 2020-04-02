const express = require("express");
const router = express.Router();

const QuestionController = require("../../../../controllers/QuestionController");
const questionController = new QuestionController();

router.post("/create/", questionController.create);
router.post("/options/create/", questionController.createOption);
router.delete("/delete/", questionController.delete);
router.get("/",questionController.questions);

module.exports = router;
