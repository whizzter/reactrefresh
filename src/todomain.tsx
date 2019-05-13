import * as React from "react";
import * as ReactDOM from "react-dom";

// let's create an faux root for the time being to appease React not liking rendering to doc.body
let root=document.createElement("div");
document.body.appendChild(root);

import App from "./todoapp";

ReactDOM.render(
	//<div>Blaff Hello world</div>
	<App name="Todo" items={[
		{id:"fewfwf",name:"Hej",done:true},
		{id:"fef23",name:"Hopp",done:false}
	]}></App>
	, root);