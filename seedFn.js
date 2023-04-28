const { sequelize } = require("./db/db");
const { Joke } = require("./db");
const jokes = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Joke.bulkCreate(jokes);
};

module.exports = seed;
