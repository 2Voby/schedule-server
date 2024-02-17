const userService = require("../service/user-service");
const adminService = require("../service/admin-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const sheetsLinksModel = require("../models/sheetsLinks-model");

class AdminController {
  async getOnline(req, res, next) {
    try {
      const onlineData = await adminService.getOnline();
      return res.json(onlineData);
    } catch (e) {
      next(e);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const userData = await adminService.getAllUsers();
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async removeUserRole(req, res, next) {
    try {
      let { userId, role } = req.body;

      const userData = await adminService.removeUserRole(userId, role);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async addRole(req, res, next) {
    try {
      let { userId, roles } = req.body;

      const userData = await adminService.addRole(userId, roles);
      return res.json(userData);
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
      let { title, text, image, date, time, pinStatus } = req.body;
      const newAnoncement = await adminService.createAnoncement(
        title,
        text,
        date,
        time,
        image,
        pinStatus
      );
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }

  async editAnoncement(req, res, next) {
    try {
      let { id, title, text, image, date, time } = req.body;

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
  async pinAnoncement(req, res, next) {
    try {
      let { id, pinStatus } = req.body;

      const newAnoncement = await adminService.pinAnoncement(id, pinStatus);
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }

  async deleteAnoncement(req, res, next) {
    try {
      let { anonceId } = req.body;

      const newAnoncement = await adminService.deleteAnoncement(anonceId);
      return res.json(newAnoncement);
    } catch (e) {
      next(e);
    }
  }

  async saveBells(req, res, next) {
    try {
      let { bells } = req.body;

      const bellsSaved = await adminService.saveBells(bells);
      return res.json(bellsSaved);
    } catch (e) {
      next(e);
    }
  }

  async getBells(req, res, next) {
    try {
      const bellsSaved = await adminService.getBells();
      return res.json(bellsSaved);
    } catch (e) {
      next(e);
    }
  }

  async getAdminScheduleLinks(req, res, next) {
    try {
      // console.log(req.user.roles);

      const groupsInfo = await sheetsLinksModel.find();
      return res.json(groupsInfo);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AdminController();
