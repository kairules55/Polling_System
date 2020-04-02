const Question = require("../models/question");
const Option = require("../models/option");

class OptionController {
  async delete(request, response) {
    try {
      const option = await Option.findById(request.query.id);
      if (option.vote != 0) {
        return response.json(400, {
          message: "Cannot delete this option"
        });
      }
      await Question.findByIdAndUpdate(option.question, {
        $pull: { options: request.query.id }
      });
      await Option.deleteOne(option);
      return response.json(200, {
        message: "Deleted Option"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }

  async addVote(request, response) {
    try {
      const option = await Option.findById(request.query.id);
      option.vote += 1;
      await option.save();
      return response.json(200, {
        data: {
          option: option
        },
        message: "Update Vote"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }

}

module.exports = OptionController;
