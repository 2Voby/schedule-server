const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Користувач з email:  ${email} вже існує`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
      activationLink,
      moneyTokens: 0,
      userCart: [],
    });

    console.log(user, name, email, password);
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Некоректне посилання активації");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Користувача з таки email не знайдено");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Невірний пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUsersMoney(req, res) {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessToken);
    const user = await UserModel.findById(userData.id);
    const userMoney = user.moneyTokens;
    return userMoney;
  }

  createUserClientId() {
    const userClientid = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
    return { id: userClientid };
  }

  async getUser(req, res) {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessToken);
    const user = await UserModel.findById(userData.id);
    return user.email;
  }

  async getLastOrder(userId) {
    const user = await UserModel.findOne({ _id: userId });

    let lastOrder = user.userOrders[0];
    user.userOrders = [];
    user.save();
    if (lastOrder) {
      return lastOrder;
    } else return null;
  }

  async topupUsersMoney(req, res) {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessToken);
    const user = await UserModel.findById(userData.id);
    let userMoney = user.moneyTokens;

    const { addedMoney } = req.body;

    userMoney = userMoney + addedMoney;

    user.moneyTokens = userMoney;
    await user.save();
    return userMoney;
  }

  async buyWithBonuses(req, res) {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessToken);
    const user = await UserModel.findById(userData.id);
    let userMoney = user.moneyTokens;

    const { price, order } = req.body;
    userMoney = userMoney - price;

    if (userMoney >= 0) {
      user.moneyTokens = userMoney;
      user.userCart.splice(0, user.userCart.length);
      await user.save();
    } else {
      throw new ApiError(400, "Недостатньо коштів");
    }

    return userMoney;
  }
}

module.exports = new UserService();
