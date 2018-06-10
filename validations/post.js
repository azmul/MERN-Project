import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validatePostInput = data =>{
   let errors = {};
   let  {text} = data;
   text = !isEmpty(text) ? text : errors.text = 'Text filed is required';
   if(!validator.isLength(text,{min:10,max:100})){
       errors.text = 'Text must be between 10 and 100 characters';
   }

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validatePostInput;