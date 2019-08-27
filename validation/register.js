const Validator = require('validator');
const isEmpty = require( './isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 4, max: 16})) {
    errors.name = 'Name must between 4 and 16 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}