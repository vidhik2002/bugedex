const { google } = require("googleapis");
const User = require("../models/user");

require("dotenv/config");
require("../models/dbInit");

const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const update = async () => {
  //Auth client Object
  const authClientObject = await auth.getClient();

  //Google sheets instance
  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });
  const spreadsheetId = process.env.SHEET_ID;

  //Read front the spreadsheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A2:C", //range of cells to read from.
    // majorDimension: "COLUMNS"
  });

  //send the data reae with the response
  console.log(readData.data.values[0][0]);

  for (let i = 0; i < readData.data.values.length; i++) {
    User.findOneAndUpdate(
      {
        username: readData.data.values[i][0],
      },
      {
        noOfSubmissions: readData.data.values[i][1],
        noOfStars: readData.data.values[i][2],
      },
      { upsert: true },
      function (err, doc) {
        if (err) console.log({ error: err });
        else console.log("Succesfully saved.");
      }
    );
  }
};

module.exports = update;
