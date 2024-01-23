require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const anoncementsModel = require("./models/anoncements-model");
const sheetsLinksModel = require("./models/sheetsLinks-model");

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

    // await mongoose.connect(process.env.DEV_DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-11-А"],
    //   link: "https://docs.google.com/spreadsheets/d/1JE84M2y19QneTCvKImIYWh2pe9Qhd32U4o1IueUqWcg",
    //   group: "11-А",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-11-Б"],
    //   link: "https://docs.google.com/spreadsheets/d/1tnFK2VNhFsQb6d4ouvZcE50WH7J0hvm8nU3FLGG_dVg",
    //   group: "11-Б",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-11-В"],
    //   link: "https://docs.google.com/spreadsheets/d/1HmX09PCR7QrLhvrQfUmum42j-FV6kZjhe1okV9IpqJQ",
    //   group: "11-В",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-11-Г"],
    //   link: "https://docs.google.com/spreadsheets/d/1Pq9mJCkCckKtDvGsqDOIlKDjCjDhZac_-r0NcwSx3Yw",
    //   group: "11-Г",
    // });

    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-10-А"],
    //   link: "https://docs.google.com/spreadsheets/d/1UXYMaF0YbjqmSj0Q9_3YL7XdA168SLIYB68hnKMU9VM",
    //   group: "10-А",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-10-Б"],
    //   link: "https://docs.google.com/spreadsheets/d/1-tQKtQWzGyAz6DIIgUhfdEcL4a41vXsFp9CkCt46OYg",
    //   group: "10-Б",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-10-В"],
    //   link: "https://docs.google.com/spreadsheets/d/1eewGrhNJGuHMQMt1J8qkxjRrj7PJ62DRg37szUH9i34",
    //   group: "10-В",
    // });
    // sheetsLinksModel.create({
    //   allowedForRoles: ["ADMIN", "ADMIN-10-Г"],
    //   link: "https://docs.google.com/spreadsheets/d/10exU9l6FVj6zBeRDyka1pNDNI4pnP7JBjmPnNQqKLxg/edit#gid=1454547578",
    //   group: "10-Г",
    // });

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
