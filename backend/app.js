const express = require("express");
const app = express();

require("dotenv/config");
require("./models/dbInit");

const cors = require("cors");
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const scoreRoute = require("./routes/leaderboard");
app.use("/score", scoreRoute);


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3001, () => {
  console.log("server started");
});
