import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import App from "./todoapp";
//import * as Model from "./todos";
import {todoUpdate} from "./todoreducers";

// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);


const store=Redux.createStore( Redux.combineReducers({ todos: todoUpdate }));



// defaultData

// render the root
ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<App name="Todo"></App>
	</ReactRedux.Provider>
	, root);