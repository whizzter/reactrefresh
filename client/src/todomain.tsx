import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import App from "./todoapp";
import {todoReducer} from "./reducers/todoreducers";

import * as ReactThunk from "react-thunk";

// add a store
const store=Redux.createStore( Redux.combineReducers({ todos: todoReducer }),Redux.applyMiddleware( (ReactThunk as any).default ));


// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);

// render the root with the store connected
ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<App name="Todo"></App>
	</ReactRedux.Provider>
	, root);