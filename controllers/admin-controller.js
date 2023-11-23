const userService = require("../service/user-service");
const adminService = require("../service/admin-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class AdminController {
  async getOnline(req, res, next) {
    try {
      const onlineData = await adminService.getOnline();
      return res.json(onlineData);
    } catch (e) {
      next(e);
    }
  }

  async getAllAnoncements(req, res, next) {
    try {
      const getAllAnoncements = await adminService.getAllAnoncements();
      return res.json(getAllAnoncements);
    } catch (e) {
      next(e);
    }
  }

  async createAnoncement(req, res, next) {
    try {
      let { title, text, image, date, time } = req.body;
      const newAnoncement = await adminService.createAnoncement(
        title,
        text,
        date,
        time,
        image
      );
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }

  async editAnoncement(req, res, next) {
    try {
      let { id, title, text, image, date, time } = req.body;
      console.log(id, title, text, image, date, time);
      const newAnoncement = await adminService.editAnoncement(
        id,
        title,
        text,
        date,
        time,
        image
      );
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }

  async deleteAnoncement(req, res, next) {
    try {
      let { anonceId } = req.body;
      console.log(anonceId, "controller");
      const newAnoncement = await adminService.deleteAnoncement(anonceId);
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AdminController();
