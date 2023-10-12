module.exports = class UserDto {
  email;
  id;
  isActivated;
  moneyTokens;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.moneyTokens = model.moneyTokens;
  }
};
