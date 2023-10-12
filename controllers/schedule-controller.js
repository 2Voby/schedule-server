const ScheduleModel = require("../models/schedule-model");
const LogsModel = require("../models/logs-model");
const logsService = require("../service/logs-service");

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
    res.send(schedule);
  }

  async createSchedule(req, res) {
    console.log(req.body);
    const schedule = await ScheduleModel.create(req.body);
    res.send(schedule);
  }

  async putSchedule(req, res) {
    const deleteToDo = await ScheduleModel.remove();
console.log(req.body);
    const newSchedule = await ScheduleModel.create(req.body);
    res.send(newSchedule);
  }

  async deleteSchedule(req, res) {
    try {
      const deleteToDo = await ScheduleModel.remove();
      res.send(deleteToDo);
    } catch (error) {
      res.send(error);
    }
  }

  async noteOnline(req, res) {
    try {
      let responce = await logsService.noteUserActivity(req);
      res.send("ok");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = new SheduleController();
