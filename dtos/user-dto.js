module.exports = class UserDto {
  email;
  id;
  isActivated;
  isAdmin;
  name;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
    this.name = model.name;
    this.roles = model.roles;
  }
};
