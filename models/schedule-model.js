const mongoose = require("mongoose");
const { use } = require("express/lib/router");

const scheduleSchema = new mongoose.Schema({
  Schedule: JSON,
  ScheduleBell: JSON,
  TeachersList: JSON,
  CompliedSchedule: JSON,
  ExtraClasses: JSON,
  TimeManagementData: JSON,
});

module.exports = mongoose.model("Schedule", scheduleSchema);
