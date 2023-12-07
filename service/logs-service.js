const logsModel = require("../models/logs-model");

class logsService {
  async noteUserActivity(userId) {
    let currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    let dayToChangeId = null;
    let currDataInfo = await logsModel.find();

    for (let i = 0; i < currDataInfo.length; i++) {
      let dayElement = currDataInfo[i];
      let currentDate = new Date(formattedDate).getTime();
      let thisDate = new Date(dayElement.Date).getTime();
      if (thisDate == currentDate) {
        dayElement.OnlinePerDay = dayElement.OnlinePerDay + 1;
        dayToChangeId = dayElement._id;
      }
    }

    if (dayToChangeId) {
      let updateItem = currDataInfo.find((item) => item._id == dayToChangeId);
      let updateItemUsers = updateItem.Users;
      if (updateItemUsers) {
        updateItemUsers = JSON.parse(updateItemUsers);
        if (!updateItemUsers.includes(userId)) {
          updateItemUsers.push(userId);
        }
      }

      let updateLog = await logsModel.findOneAndUpdate(
        { _id: dayToChangeId },
        {
          OnlinePerDay: updateItem.OnlinePerDay,
          Users: JSON.stringify(updateItemUsers),
        },
        { useFindAndModify: false }
      );
    } else {
      await logsModel.create({
        Date: formattedDate,
        OnlinePerDay: 1,
        Users: JSON.stringify([userId]),
      });
    }
  }
}

module.exports = new logsService();
