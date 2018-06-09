import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateExperienceInput = data =>{
   let errors = {};
   let  {title,company, from, to} = data;

   title = !isEmpty(title) ? title : errors.title = 'Job Title filed is required';
   company = !isEmpty(company) ? company : errors.company = 'Company filed is required';
   from = !isEmpty(from) ? from : errors.from = 'From data filed is required';
   to = !isEmpty(to) ? to : errors.to = 'To date filed is required';

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateExperienceInput;