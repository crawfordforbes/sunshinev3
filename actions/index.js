import * as types from '../constants/ActionTypes'

export function updateMonths(idx, newMonths){
  return {type: types.UPDATE_MONTHS, idx, newMonths}
}


