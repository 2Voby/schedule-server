require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const anoncementsModel = require("./models/anoncements-model");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ limit: "250mb" }));
app.use(express.urlencoded({ extended: true, limit: "250mb" }));
app.use(cookieParser());
app.use(cors());
app.use(
  cors({
    origin: [
      "https://lyceum-schedule.ztu.edu.ua",
      "https://script.google.com",
      "http://localhost:5403",
    ], // Укажите разрешенный источник
    methods: ["GET", "POST", "PUT", "DELETE"], // Укажите разрешенные HTTP методы
    allowedHeaders: ["Content-Type", "Authorization"], // Укажите разрешенные заголовки
  })
);

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    await mongoose.connect(process.env.DEV_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    // let items = await anoncementsModel.find();

    // let i = 8;
    // for (const item of items) {
    //   if (i > 0) {
    //     let newAnonce = await anoncementsModel.create({
    //       title: item.title,
    //       text: item.text,
    //       finallyDate: item.finnalyDate,
    //       finallyTime: item.finnalyTime,
    //       image: item.image,
    //     });
    //     i--;
    //   }
    // }

    // console.log(item);

    // await currDataInfo.save();
  } catch (e) {
    console.log(e);
  }
};

start();
