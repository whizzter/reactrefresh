import * as React from "react";

import * as Redux from "Redux";
import * as ReactRedux from "react-redux";

import * as TodoActions from "./actions/todoactions";
import {TodoItem,TodoState} from "./defs/tododefs";

class Item extends React.Component<TodoItem & { flipItem:(id:string)=>void },{}> {
	render() {
		return <div key={this.props.id}>
			<span>[ {this.props.name} ] </span>
			<input type="checkbox" checked={this.props.done} onChange={(evt)=>{
				this.props.flipItem(this.props.id)
				// this.props.done=this.props.done !== true;
			}}></input>
		</div>
	}
}

//let clz=

// Transparent box: 		<div style={ {backgroundColor:"#000000", left:0, top:0, right:0, bottom:0, position:"absolute", opacity:0.4} }>Hej</div>

class App extends React.Component<{name:string,items:TodoItem[],flipItem:(id:string)=>void},{}> {
	render() {
		return <div>{this.props.name}  app component! <div style={ { backgroundColor:"#fff3f3" } }>{
			this.props.items.map(
				(item)=><Item key={item.id} { ...item } flipItem={ this.props.flipItem } ></Item>)
		}</div>
		</div>
	}
};


export default ReactRedux.connect(
	(state:{todos:TodoState})=>({
		items:state.todos.items
	}),
	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators(TodoActions,dispatch)
	)(App);