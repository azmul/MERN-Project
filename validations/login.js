import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateLoginInput = data =>{
   let errors = {};
   let  {email,password} = data;
   email = !isEmpty(email) ? email : errors.email = 'Email filed is required';
   password = !isEmpty(password) ? password : errors.password = 'Password filed is required';
   
   if(validator.isEmail(email)){
       errors.email = 'Email is valid';
   }else{
       errors.email = 'Email is not valid';
   }
   if(!validator.isLength(password,{min:6,max:30})){
       errors.password = 'Password must be between 6 and 30 characters';
   }

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateLoginInput;