// libraries
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

// graphql
const graphqlSchema = require("../graphql/schema");
const graphqlResolvers = require("../graphql/resolvers");

// helpers
const isAuth = require("./middlewares/isAuth");
const app = express();

// constants
const PORT = 3000;

// middlewares
app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

// mongo connection
mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}!`);
    });
  })
  .catch(mongooseError => {
    console.error(mongooseError);
  });
