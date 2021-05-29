import { combineReducers } from 'redux'
import dataReducer from '../Reducer/dataReducer'

export default combineReducers({
  data: dataReducer
})