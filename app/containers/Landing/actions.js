/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_ACTIVITIES_LOAD = 'landing/GET_ACTIVITIES_LOAD';
export const GET_ACTIVITIES_SUCCESS = 'landing/GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAIL = 'landing/GET_ACTIVITIES_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getActivities() {
	return (dispatch) => {
		dispatch({ type: GET_ACTIVITIES_LOAD });

		return clientFetch('/api/activities', {
			method: 'GET'
		})
		.then((result) => {
			dispatch({ type: GET_ACTIVITIES_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_ACTIVITIES_FAIL, error });
		});
	};
}