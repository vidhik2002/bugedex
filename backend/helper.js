// const cron = require("node-cron");

// module.exports = () => {
//   cron.schedule("*/4 * * * *", () => {
//     console.log("running a task every 4 minutes");
//   });
// };

const creds = require("./creds.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1vEGLymJeiMFieGyR3vl1RFp8dA3Usak-9b2ZA2U18Ew"
);
async function main(){
    // await doc.useServiceAccountAuth({
    //   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   private_key: process.env.GOOGLE_PRIVATE_KEY,
    // });
    await doc.useServiceAccountAuth(creds, "vidhik2002@gmail.com");
    
    doc.loadInfo().then(( ) => 
        console.log(doc)
    ) // loads document properties and worksheets
}
main()