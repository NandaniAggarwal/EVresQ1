const passportLocalMongoose = require("passport-local-mongoose");

const PLM_OPTIONS = {
  usernameField: "email",   // 👈 email ko username banaya
  usernameLowerCase: true,  // lowercase me convert karega
  errorMessages: {
    UserExistsError: "A user with this email already exists"
  }
};

module.exports = { passportLocalMongoose, PLM_OPTIONS };