const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose
  .connect(
    "mongodb+srv://dudhaTdarshangmailcom:5Fxt2hOXbK1A86O8@cluster0.nzjaafo.mongodb.net/hotel",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DataBase Connection successfully");
  })
  .catch(() => {
    console.log("err");
  });

module.exports = connection;

// mongodb+srv://dudhaTdarshangmailcom:5Fxt2hOXbK1A86O8@cluster0.nzjaafo.mongodb.net/hotel
