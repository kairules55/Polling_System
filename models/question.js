const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
