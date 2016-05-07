import {UPDATE_VIEW} from '../constants/ActionTypes'
const initialState = {
	view: "contents"

};
export default (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_VIEW:
			return Object.assign({}, state, {view: action.view})



		default:
		return state
	}
}