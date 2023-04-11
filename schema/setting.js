const { checkSchema } = require("express-validator");

const addSchema = checkSchema({
  username: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
  stagename: {
    notEmpty: true,
  },
});

const deleteSchema = checkSchema({
  username: {
    notEmpty: true,
  }
});

module.exports = {
  add: addSchema,
  delete: deleteSchema
};
