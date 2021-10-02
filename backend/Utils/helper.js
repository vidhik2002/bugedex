const cron = require("node-cron");
const update = require("./updater")

module.exports = () => {
  cron.schedule("*/10 * * * * *", () => {
    // update();
    console.log("running a task every minutes");
  });
};
