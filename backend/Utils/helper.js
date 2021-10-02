const cron = require("node-cron");
const update = require("./updater")

module.exports = () => {
  cron.schedule("*/4 * * * *", () => {
    update();
    console.log("running a task every 4 minutes");
  });
};
