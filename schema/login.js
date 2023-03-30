const { checkSchema } = require("express-validator");

const schema = checkSchema({
  username: {
   notEmpty: true 
  },
  password: {
    notEmpty: true
  }
});

module.exports = schema;