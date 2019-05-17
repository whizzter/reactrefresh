import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import {App,StatusContainer} from "./todoapp";
import {todoReducer} from "./reducers/todoreducers";
import {statusReducer} from "./reducers/statusreducer";
import * as TodoActions from "./actions/todoactions";

import ReduxThunk from "redux-thunk";

// add our stores
const store=Redux.createStore( Redux.combineReducers({
	todos: todoReducer,
	status: statusReducer
}),Redux.applyMiddleware( ReduxThunk ));

// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);

// render the root with the store connected
ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<App name="Todo"></App>
		<StatusContainer/>
		<button onClick={ (ev)=>store.dispatch(TodoActions.load() as any)  }>EEh?</button>
	</ReactRedux.Provider>
	, root);