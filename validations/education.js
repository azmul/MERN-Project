import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateEducationInput = data =>{
   let errors = {};
   let  {school,degree,filedofStudy, from} = data;

   school = !isEmpty(school) ? school : errors.school = 'School filed is required';
   degree = !isEmpty(degree) ? degree : errors.degree = 'Degree filed is required';
   from = !isEmpty(from) ? from : errors.from = 'From data filed is required';
   filedofStudy = !isEmpty(filedofStudy) ? filedofStudy : errors.filedofStudy = 'Filed of Study filed is required';

   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateEducationInput;