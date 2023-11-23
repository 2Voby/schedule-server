const ScheduleModel = require("../models/schedule-model");
const LogsModel = require("../models/logs-model");
const logsService = require("../service/logs-service");
const anoncementsModel = require("../models/anoncements-model");
const scheduleService = require("../service/schedule-service");

class SheduleController {
  async checkReq(req, res, next) {
    try {
      //   let responce = JSON.parse(req.body);
      console.log(req.body);
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
    console.log(schedule);
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
      let responce = await logsService.noteUserActivity(req);
      return res.json("ok");
    } catch (error) {
      res.json(error);
    }
  }

  async getAllAnoncements(req, res) {
    try {
      let responce = await anoncementsModel.find();
      // console.log(responce);
      return res.json(responce);
    } catch (error) {
      return res.json(error);
    }
  }

  async getClosestEvent(req, res) {
    try {
      let anoce = await scheduleService.getClosestEvent();
      // console.log("fdsfsdfd", anoce);
      return res.json(anoce);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = new SheduleController();
