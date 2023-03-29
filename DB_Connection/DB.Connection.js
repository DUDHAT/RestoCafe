const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose
  .connect(
    "mongodb+srv://dudhaTdarshangmailcom:5Fxt2hOXbK1A86O8@cluster0.nzjaafo.mongodb.net/restaurant",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DataBase Connection successfully");
  })
  .catch((err) => {
    console.log("hello world");
  });

module.exports = connection;

// mongodb+srv://dudhaTdarshangmailcom:5Fxt2hOXbK1A86O8@cluster0.nzjaafo.mongodb.net/hotel
