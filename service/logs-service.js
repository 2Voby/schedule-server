const logsModel = require("../models/logs-model");

class logsService {
  async noteUserActivity(req) {
    let user = req.body;
    let currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    let dayToChangeId = null;
    const currDataInfo = await logsModel.find();

    for (let i = 0; i < currDataInfo.length; i++) {
      let dayElement = currDataInfo[i];
      let currentDate = new Date(formattedDate).getTime();
      let thisDate = new Date(dayElement.Date).getTime();
      if (thisDate == currentDate) {
        // dayElement.Users.push(user);
        dayElement.OnlinePerDay = dayElement.OnlinePerDay + 1;
        dayToChangeId = dayElement._id;
      }
    }

    if (dayToChangeId) {
      let updateItem = currDataInfo.find((item) => item._id == dayToChangeId);
      let updateLog = await logsModel.findOneAndUpdate(
        { _id: dayToChangeId },
        {
          OnlinePerDay: updateItem.OnlinePerDay,
          // Users: updateItem.Users,
        },
        { useFindAndModify: false }
      );
    } else {
      await logsModel.create({
        Date: formattedDate,
        OnlinePerDay: 1,
        // Users: [user],
      });
    }
  }
}

module.exports = new logsService();
