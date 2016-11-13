import {UPDATE_STATE} from '../constants/ActionTypes'
const data = {
	view: 'posts'
}
export default (state = data, action) => {
	switch(action.type) {
		case UPDATE_STATE:
			let newState = state;
			newState[action.key] = action.value
			return Object.assign({}, state, newState)

			break;



		default:
		return state
	}
}