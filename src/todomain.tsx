import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import App from "./todoapp";
import * as Model from "./todos";

// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);


const store=Redux.createStore( Redux.combineReducers({ todos: Model.todoUpdate }));



// defaultData

// render the root
ReactDOM.render(
	//<div>Blaff Hello world</div>
	<ReactRedux.Provider store={store}>
		<App name="Todo"></App>
	</ReactRedux.Provider>
	, root);