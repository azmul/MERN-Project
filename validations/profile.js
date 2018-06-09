import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateProfileInput = data =>{
   let errors = {};
   let  {handle,status} = data;
   handle = !isEmpty(handle) ? handle : errors.handle = 'Profile handle filed is required';
   status = !isEmpty(status) ? status : errors.status = 'Status filed is required';
   
   if(!validator.isLength(handle,{min:2,max:40})){
       errors.handle = 'Handle must be between 2 and 40 characters';
   }

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateProfileInput;