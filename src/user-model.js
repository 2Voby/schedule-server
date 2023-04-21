const mongoose = require("mongoose");
const { use } = require("express/lib/router");

const userSchema = new mongoose.Schema({
 Schedule: JSON,
  ScheduleBell: JSON,
  TeachersList: JSON,
  CompliedSchedule: JSON,
  ExtraClasses: JSON,
  TimeManagementData: JSON,
});

module.exports = mongoose.model("User", userSchema);
