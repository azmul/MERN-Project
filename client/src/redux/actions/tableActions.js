import { FETCH_DATAS} from './types';
import axios from 'axios';

// Fetch all datas
export const fetchdatas = () =>
      async dispatch=>{
          const res = await axios.get('/datas');
          dispatch({type: FETCH_DATAS, payload: res.data})
      }

