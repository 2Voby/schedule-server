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
  let closestDate = null;

  // Находим ближайшую дату и фильтруем все события на этот день
  anocnes.forEach((anonce) => {
    let anonceDate = new Date(anonce.finallyDate);
    if (currDate <= anonceDate) {
      if (!closestDate || anonceDate.getTime() === closestDate.getTime()) {
        allUpcomingEvents.push(anonce);
        closestDate = anonceDate;
      } else if (anonceDate < closestDate) {
        allUpcomingEvents = [anonce];
        closestDate = anonceDate;
      }
    }
  });

  return allUpcomingEvents;
}
