require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const logsModel = require("./models/logs-model");

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
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    // let item = await logsModel.findOneAndUpdate(
    //   { Date: "2023-10-13" },
    //   { Users: null }
    // );
    // console.log(item);

    // await currDataInfo.save();
  } catch (e) {
    console.log(e);
  }
};

start();
