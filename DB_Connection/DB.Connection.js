const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose
  .connect(
    "mongodb+srv://Vinit04:bMoptmtm0eV8mk1I@cluster0.zefyhxr.mongodb.net/RestoCafe",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DataBase Connection successfully");
  });

module.exports = connection;

// mongodb+srv://dudhaTdarshangmailcom:5Fxt2hOXbK1A86O8@cluster0.nzjaafo.mongodb.net/hotel
