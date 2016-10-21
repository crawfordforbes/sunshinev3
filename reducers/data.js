import {UPDATE_MONTHS} from '../constants/ActionTypes'
const initialState = {
	pics: [
		{
			id: 0,
			url: "#",
			carousel: 0
		},
		{
			id: 1,
			url: "#",
			carousel: 1
		}
	],
	posts: [
		{
			id: 0,
			title: "title for post 0",
			story: "story for post 0",
			section: "news"
		},
				{
			id: 1,
			title: "title for post 1",
			story: "story for post 1",
			section: "shows"
		},
		{
			id: 2,
			title: "title for post 2",
			story: "story for post 2",
			section: "press"
		},
		{
			id: 3,
			title: "title for post 3",
			story: "story for post 3",
			section: "videos"
		},
		{
			id: 4,
			title: "title for post 4",
			story: "story for post 4",
			section: "contact"
		},
		{
			id: 5,
			title: "title for post 5",
			story: "story for post 5",
			section: "news"
		},
				{
			id: 6,
			title: "title for post 6",
			story: "story for post 6",
			section: "shows"
		},
		{
			id: 7,
			title: "title for post 7",
			story: "story for post 7",
			section: "press"
		},
		{
			id: 8,
			title: "title for post 8",
			story: "story for post 8",
			section: "videos"
		}
	]
};
export default (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_MONTHS:
			const updateMonthsState = JSON.parse(JSON.stringify(state));
			updateMonthsState.loans[action.idx].months = parseInt(action.newMonths)
			return Object.assign({}, state, updateMonthsState)



		default:
		return state
	}
}