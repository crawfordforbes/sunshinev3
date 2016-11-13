import * as types from '../constants/ActionTypes'

export function updateState(key, value){
  return {type: types.UPDATE_STATE, key, value}
}


