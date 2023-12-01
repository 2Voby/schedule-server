module.exports = class UserDto {
  email;
  id;
  isActivated;
  isAdmin;
  name;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
    this.name = model.name;
  }
};
