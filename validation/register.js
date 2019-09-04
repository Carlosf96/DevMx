const Validator = require('validator');
const isEmpty = require( './isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 4, max: 16})) {
    errors.name = 'Name must between 4 and 16 characters';
  }
  if (!Validator.isEmail(data.email)) { 
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) { 
    errors.email = 'Email field required';
  }
  if (Validator.isEmpty(data.password)) { 
    errors.password = 'Password field required';
  }
  if (!Validator.isLength(data.password, { min: 4, max: 16})) {
    errors.password = 'Password must between 4 and 16 characters';
  }
  if (Validator.isEmpty(data.password2)) { 
    errors.password2 = 'Please Confirm Password';
  }
  if (!Validator.equals(data.password. data.password2)) {
    errors.password2 = 'Passwords do not match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}