const Quesiton = require("../models/question");
const Option = require("../models/option");

class QuestionController {
  async create(request, response) {
    try {
      const question = await Quesiton.create(request.body);
      return response.json(200, {
        data: {
          question: question
        },
        message: "Question Created"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }

  async createOption(request, response) {
    try {
      const option = await Option.create({
        text: request.body.text,
        vote: 0,
        question: request.query.id
      });

      option.link_to_vote =
        "localhost:8000/api/v1/options/addVote/?id=" + option.id;
      option.save();
      const question = await Quesiton.findById(request.query.id);
      console.log(question);
      await question.options.push(option);
      await question.save();
      return response.json(200, {
        data: {
          option: option
        },
        message: "Option Created"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }

  async delete(request, response) {
    try {
      const question = await Quesiton.findById(request.query.id);
      if (question.options.length != 0) {
        return response.json(400, {
          message: "Cannot delete this question"
        });
      }
      await Quesiton.deleteOne(question);
      return response.json(200, {
        message: "Question Deleted"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }

  async questions(request, response) {
    try {
      const question = await Quesiton.findById(request.query.id).populate(
        "options"
      );
      return response.json(200, {
        data: {
          question: question
        },
        message: "Question"
      });
    } catch (error) {
      return response.json(500, {
        message: "Internal Server Error " + error
      });
    }
  }
}

module.exports = QuestionController;
