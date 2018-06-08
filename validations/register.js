import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateRegisterInput = data =>{
   let errors = {};
   let {name, email,password,password2} = data;
   name = !isEmpty(name) ? name : errors.name = 'Name filed is required';
   email = !isEmpty(email) ? email : errors.email = 'Email filed is required';
   password = !isEmpty(password) ? password : errors.password = 'Password filed is required';
   password2 = !isEmpty(password2) ? password2 : errors.password2 = 'Password2 filed is required';
   
   if(!validator.isLength(name ,{min:2, max:50})){
       errors.name = 'Name must be between 2 and 50 characters';
   } 
   if(!validator.isEmail(email)){
       errors.email = 'Email is not valid';
   }
   if(!validator.isLength(password,{min:6,max:30})){
       errors.password = 'Password must be between 6 and 30 characters';
   }
   if(!validator.isLength(password2,{min:6,max:30})){
    errors.password2 = 'Password2 must be between 6 and 30 characters';
   }
   if(!validator.equals(password, password2)){
    errors.password2 = 'Passwords must match';
   }

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateRegisterInput;