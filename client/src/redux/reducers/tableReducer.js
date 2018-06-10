import { FETCH_DATAS} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state= initialState, action){
    switch(action.type){
        case FETCH_DATAS:
             return{
                 ...state,
                 items: action.payload
             }    
        default:
          return state;
    }
}