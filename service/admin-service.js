const ApiError = require("../exceptions/api-error");
const anoncementsModel = require("../models/anoncements-model");
const bellsModel = require("../models/bells-model");
const logsModel = require("../models/logs-model");

class AdminService {
  async getOnline(user) {
    let logs = await logsModel.find();
    if (!logs) {
      throw ApiError.BadRequest("Інформацію не знайдено");
    }

    return logs;
  }

  async getAllAnoncements() {
    let anoncements = await anoncementsModel.find();
    if (!anoncements) {
      throw ApiError.BadRequest("Інформацію не знайдено");
    }
    return anoncements;
  }

  async createAnoncement(title, text, date, time, image, pinStatus) {
    if (!title && !date) {
      throw ApiError.BadRequest("Неправильний формат вводу, спробуйте ще раз");
    }

    let newAnonce = await anoncementsModel.create({
      title: title,
      text: text,
      finallyDate: date,
      finallyTime: time,
      image: image,
      updatedAt: new Date(),
      isPinned: pinStatus,
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
    console.log(image);

    anonce.title = title;
    anonce.text = text;
    anonce.finallyDate = date;
    // anonce.image = image;
    anonce.finallyTime = time;
    anonce.updatedAt = new Date();

    await anonce.save();
    return anonce;
  }

  async pinAnoncement(id, pinStatus) {
    let anonce = await anoncementsModel.findOneAndUpdate(
      { _id: id },
      { isPinned: pinStatus }
    );
    if (!anonce) {
      throw ApiError.BadRequest(
        `Анонс з таким ID: (${id}), не знайдено в базі`
      );
    }
    return anonce;
  }

  async deleteAnoncement(id) {
    let anonce = await anoncementsModel.findOneAndDelete({ _id: id });

    if (!anonce) {
      throw ApiError.BadRequest(`Помилка! Анонса за ID: ${id} не існує`);
    }

    return anonce;
  }

  async saveBells(bells) {
    let deletedItems = await bellsModel.remove();
    console.log(bells);
    let bellsObject = await bellsModel.create({ bells: bells });
    if (!bellsObject) {
      throw ApiError.BadRequest(`Помилка! Збереження розкаладу занять`);
    }
    return bellsObject;
  }

  async getBells() {
    let bellsObject = await bellsModel.find();
    if (!bellsObject) {
      throw ApiError.BadRequest(`Помилка отримання розкладу дзвінків! `);
    }
    return bellsObject;
  }
}

module.exports = new AdminService();
