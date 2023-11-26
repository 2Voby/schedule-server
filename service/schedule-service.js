const ApiError = require("../exceptions/api-error");

const anoncementsModel = require("../models/anoncements-model");

// const logsModel = require("../models/logs-model");

class scheduleService {
  async getClosestEvent() {
    let anonces = await anoncementsModel.find();
    let closestAnonce = null;
    closestAnonce = findClosestOrToday(anonces);
    return closestAnonce;
  }
}

module.exports = new scheduleService();

function findClosestOrToday(anocnes) {
  let currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  let allUpcomingEvents = [];
  anocnes.forEach((anonce) => {
    let anonceDate = new Date(anonce.finallyDate);
    if (currDate <= anonceDate) {
      allUpcomingEvents.push(anonce);
    }
  });
  let closestDateObj = null;
  if (allUpcomingEvents.length > 0) {
    closestDateObj = allUpcomingEvents.reduce((closest, current) => {
      const closestDate = new Date(closest.finallyDate);
      const currentDate = new Date(current.finallyDate);
      return currentDate < closestDate ? current : closest;
    });
  }

  return closestDateObj;
}
