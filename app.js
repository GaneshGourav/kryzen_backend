const express = require("express");
require("./db/db.js");
const app = express();
const userRouter = require("./api/routes/user-routes.js");
const productRouter = require("./api/routes/products-routes.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./api/service/image-service.js");
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
userRouter.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);

const port = process.env.PORT || 4093;
app.listen(port, () => {
  console.log(`port... ${port}`);
});
