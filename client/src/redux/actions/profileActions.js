import axios from 'axios';
import {GET_ERRORS,GET_PROFILE,PROFILE_LOADING,PROFILE_NOT_FOUND,CLEAR_CURRENT_PROFILE} from './types';

// user register
export const getCurrentProfile = () =>
    async dispatch=>{
        dispatch(currentProfileLoading());
        axios.get('/api/profile')
            .then(res=> dispatch({type:GET_PROFILE, payload: res.data}))
            .catch(err =>{
                dispatch({type: GET_PROFILE, payload: {}})
        });
}
// Current Profile loading
export const currentProfileLoading = ()=>{
    return{
        type: PROFILE_LOADING
    }
}
// Clear Current profile
export const clearCurrentProfile = ()=>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}