const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userController = require("./controllers/user");
const session = require("express-session");
const router = require("./routes");
const cloudinary = require("cloudinary").v2;
const config = require("dotenv").config({ path: ".env" });
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 900000000 },
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(router);

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB}`);
    console.log("Kết nối mongoDB thành công");
    const isCreateDefaultUserSuccess = await userController.register();
    if (isCreateDefaultUserSuccess) {
      console.log(
        "Tạo người dùng thành công. truy cập env để biết thông tin tài khoản."
      );
    }
  } catch (error) {
    console.log(error);
  }
};
connectDb();

app.listen("8080", () => {
  console.log("Sever is running!");
});
