import * as React from "react";

interface TodoItem {
	id:string,
	name:string,
	done:boolean
}

// Component<Props,State>
export default class App extends React.Component<{name:string,items:TodoItem[]},{}> {
	render() {
		return <div>{this.props.name}  app component! <div>{
			this.props.items.map((item)=><div key={item.id}> <span>{item.name}</span> <input type="checkbox" checked={item.done}></input> </div>)
		}</div></div>
	}
}