import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import {App,StatusContainer} from "./todoapp";
import {todoReducer} from "./reducers/todoreducers";
import {statusReducer} from "./reducers/statusreducer";
import {editReducer} from "./reducers/editreducer";
import * as TodoActions from "./actions/todoactions";

import ReduxThunk from "redux-thunk";

// add our stores
const store=Redux.createStore( Redux.combineReducers({
	todos: todoReducer,
	status: statusReducer,
	edit: editReducer
}),Redux.applyMiddleware( ReduxThunk ));

// dispatch an load action to get data from the server instead of any local data!
store.dispatch(TodoActions.load() as any);

// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);

// render the root with the store connected
ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<App name="Todo"></App>
		<StatusContainer/>
	</ReactRedux.Provider>
	, root);

// Button to force state reload: <button onClick={ (ev)=>store.dispatch(TodoActions.load() as any)  }>EEh?</button>
