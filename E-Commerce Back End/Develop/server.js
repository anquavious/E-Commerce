const express = require('express');
const sequelize = require('./config/connection.js');
const routes = require('./routes');
// import sequelize connection
module.exports = (sequelize) => {
  const user = sequelize.define(
    'user',
    {
      firstName: {
        type: sequelize.STRING,
      },
      lastName: {
        type: sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
