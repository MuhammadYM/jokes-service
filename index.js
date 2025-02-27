const express = require("express");
const app = express();
const { Joke } = require("./db");
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jokes", async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    const { content, tags } = req.query;
    if (tags) {
      jokes = await Joke.findAll({
        where: {
          tags: {
            [Op.like]: `%${tags}%`,
          },
        },
      });
    } else if (content) {
      jokes = await Joke.findAll({
        where: {
          joke: {
            [Op.like]: `%${content}%`,
          },
        },
      });
    } else {
      jokes = await Joke.findAll({});
    }

    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
