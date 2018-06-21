import { GET_ERRORS } from './types';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

// user register
export const registerUser = (userData, history) =>
    async dispatch=>{
        axios.post('/api/users/register',userData)
            .then(res=> history.push('/login'))
            .catch(err =>{
                dispatch({type: GET_ERRORS, payload: err.response.data})
            });
    }

// Login user -- get token
export const loginUser = (userData) =>
    async dispatch =>{
         axios.post('/api/login',userData)
              .then(res=>{
                  // save token to localStorage
                  const {token} = res.data;
                  localStorage.setItem('jwtToken', token);
                  // Set token to Auth Header
                  setAuthToken(token);
              })
    }
