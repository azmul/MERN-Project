import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateProfileInput = data =>{
   let errors = {};
   let  {handle,status, skills, website,youtube, twitter,facebook, linkedin, instagram} = data;
   
   handle = !isEmpty(handle) ? handle : errors.handle = 'Profile handle filed is required';
   status = !isEmpty(status) ? status : errors.status = 'Status filed is required';
   skills = !isEmpty(skills) ? skills : errors.skills = 'Skills filed is required';
   website = !isEmpty(website) ? website : errors.website = 'Website filed is required';
   youtube = !isEmpty(youtube) ? youtube : errors.youtube = 'Youtube filed is required';
   twitter = !isEmpty(twitter) ? twitter : errors.twitter = 'Twitter filed is required';
   facebook = !isEmpty(facebook) ? facebook : errors.facebook = 'Facebook filed is required';
   linkedin = !isEmpty(linkedin) ? linkedin : errors.linkedin = 'linkedin filed is required';
   instagram = !isEmpty(instagram) ? instagram : errors.instagram = 'Instagram filed is required';
  
   if(!validator.isLength(handle,{min:2,max:40})){
       errors.handle = 'Handle must be between 2 and 40 characters';
   }
   if(!validator.isURL(website)){
       errors.website = "Website url is not valid";
   }
   if(!validator.isURL(youtube)){
       errors.youtube = "youtube url is not valid";
   }
   if(!validator.isURL(twitter)){
       errors.twitter = "Twitter url is not valid";
   }
   if(!validator.isURL(facebook)){
      errors.facebook = "Facebook url is not valid";
   }
   if(!validator.isURL(linkedin)){
      errors.linkedin = "Linkedin url is not valid";
   }
   if(!validator.isURL(instagram)){
      errors.instagram = "Instagram url is not valid";
   }


   return{
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateProfileInput;