const mongoose = require("mongoose");
require("dotenv").config()

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("connected ..");
  })
  .catch((e) => {
    console.log(e, "No Connection ");
  });
