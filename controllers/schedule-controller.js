const ScheduleModel = require("../models/schedule-model");
const LogsModel = require("../models/logs-model");
const logsService = require("../service/logs-service");
const anoncementsModel = require("../models/anoncements-model");
const scheduleService = require("../service/schedule-service");
const ApiError = require("../exceptions/api-error");

class SheduleController {
  async checkReq(req, res, next) {
    try {
      //   let responce = JSON.parse(req.body);

      return res.json(req.body);
    } catch (e) {
      next(e);
    }
  }

  async getSchedule(req, res) {
    let schedule;
    if (req.params.id) {
      schedule = await ScheduleModel.findById(req.params.id);
    } else {
      schedule = await ScheduleModel.find();
    }
    return res.json(schedule);
  }

  async createSchedule(req, res) {
    const schedule = await ScheduleModel.create(req.body);
    return res.json(schedule);
  }

  async putSchedule(req, res) {
    let schedule = req.body;

    const deleteToDo = await ScheduleModel.remove();
    const newSchedule = await ScheduleModel.create(schedule);
    return res.json(newSchedule);
  }

  async deleteSchedule(req, res) {
    try {
      const deleteToDo = await ScheduleModel.remove();
      return res.json(deleteToDo);
    } catch (error) {
      return res.json(error);
    }
  }

  async noteOnline(req, res) {
    try {
      let { clientId } = req.body;
      let responce = await logsService.noteUserActivity(clientId);
      return res.json("ok");
    } catch (error) {
      res.json(error);
    }
  }

  async getAllAnoncements(req, res) {
    try {
      let responce = await anoncementsModel.find();
      return res.json(responce);
    } catch (error) {
      return res.json(error);
    }
  }

  async getPinnedAnoncements(req, res) {
    try {
      let responce = await anoncementsModel.find({ isPinned: true });
      return res.json(responce);
    } catch (error) {
      return res.json(error);
    }
  }

  async getClosestEvent(req, res) {
    try {
      let anoce = await scheduleService.getClosestEvent();
      if (!anoce) {
        return res.status(400).json("Подію не знайдено");
      }
      return res.json(anoce);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new SheduleController();
