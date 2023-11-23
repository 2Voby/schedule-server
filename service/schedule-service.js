const anoncementsModel = require("../models/anoncements-model");

// const logsModel = require("../models/logs-model");

class scheduleService {
  async getClosestEvent() {
    let anonces = await anoncementsModel.find();
    const closestAnonce = findClosestOrToday(anonces);
    console.log(closestAnonce);
    return closestAnonce;
  }
}

module.exports = new scheduleService();

function findClosestOrToday(anocnes) {
  let currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  // let closestelement = null
  let allUpcomingEvents = [];
  anocnes.forEach((anonce) => {
    let anonceDate = new Date(anonce.finnalyDate);

    if (currDate <= anonceDate) {
      allUpcomingEvents.push(anonce);
    }
  });

  const closestDateObj = allUpcomingEvents.reduce((closest, current) => {
    const closestDate = new Date(closest.finnalyDate);
    const currentDate = new Date(current.finnalyDate);
    return currentDate < closestDate ? current : closest;
  });
  console.log(allUpcomingEvents);
  console.log(closestDateObj);
  return closestDateObj;
}
