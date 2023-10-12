const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Помилка при валідації", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // async refresh(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const userData = await userService.refresh(refreshToken);
  //     res.cookie("refreshToken", userData.refreshToken, {
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       domain: "tomprimefigurines.com",
  //       secure: true,
  //       httpOnly: true,
  //     });
  //     return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUsersMoney(req, res, next) {
    try {
      const userMoney = await userService.getUsersMoney(req);
      return res.json(userMoney);
    } catch (e) {
      next(e);
    }
  }

  async topUpUsersMoney(req, res, next) {
    try {
      const userMoney = await userService.topupUsersMoney(req);
      return res.json(userMoney);
    } catch (e) {
      next(e);
    }
  }
  async buyWithBonuses(req, res, next) {
    try {
      const userMoney = await userService.buyWithBonuses(req);
      if (userMoney < 0) {
        return res.status(400).json("недостатньо коштів");
      }
      return res.json(userMoney);
    } catch (e) {
      next(e);
    }
  }
  async getLastOrder(req, res, next) {
    try {
      const userId = req.user.id;

      let lastOrder = await userService.getLastOrder(userId);
      if (!lastOrder) {
        throw ApiError.BadRequest("Замовлення не знайдено");
      }

      return res.json(lastOrder);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
