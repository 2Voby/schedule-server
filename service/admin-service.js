const ApiError = require("../exceptions/api-error");
const anoncementsModel = require("../models/anoncements-model");
const logsModel = require("../models/logs-model");

class AdminService {
  async getOnline(user) {
    let logs = await logsModel.find();
    if (!logs) {
      throw ApiError.BadRequest("Інформацію не знайдено");
    }

    console.log(logs);

    return logs;
  }

  async getAllAnoncements() {
    let anoncements = await anoncementsModel.find();
    if (!anoncements) {
      throw ApiError.BadRequest("Інформацію не знайдено");
    }
    return anoncements;
  }

  async createAnoncement(title, text, date, time, image) {
    if (!title && !date) {
      throw ApiError.BadRequest("Неправильний формат вводу, спробуйте ще раз");
    }

    let newAnonce = await anoncementsModel.create({
      title: title,
      text: text,
      finnalyDate: date,
      finnalyTime: time,
      image: image,
    });

    if (!newAnonce) {
      throw new ApiError(500, "Помилка при створенні анонсу");
    }

    return newAnonce;
  }

  async editAnoncement(id, title, text, date, time, image) {
    let anonce = await anoncementsModel.findOne({ _id: id });
    if (!anonce) {
      throw ApiError.BadRequest(
        `Анонс з таким ID: (${id}), не знайдено в базі`
      );
    }

    anonce.title = title;
    anonce.text = text;
    anonce.finnalyDate = date;
    anonce.image = image;
    anonce.finnalyTime = time;

    await anonce.save();
    return anonce;
  }

  async deleteAnoncement(id) {
    console.log(id, "service");

    let anonce = await anoncementsModel.findOneAndDelete({ _id: id });
    // console.log(anonce);

    if (!anonce) {
      throw ApiError.BadRequest(`Помилка! Анонса за ID: ${id} не існує`);
    }

    return anonce;
  }
}

module.exports = new AdminService();