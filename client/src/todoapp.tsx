import * as React from "react";

import * as Redux from "Redux";
import * as ReactRedux from "react-redux";

import * as TodoActions from "./todoactions";
import {TodoItem,TodoState} from "./tododefs";

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
class App extends React.Component<{name:string,items:TodoItem[],flipItem:(id:string)=>void},{}> {
	render() {
		return <div>{this.props.name}  app component! <div style={ { backgroundColor:"#fff3f3" } }>{
			this.props.items.map(
				(item)=><Item key={item.id} { ...item } flipItem={ this.props.flipItem } ></Item>)
		}</div></div>
	}
};


export default ReactRedux.connect(
	(state:{todos:TodoState})=>({
		items:state.todos.items
	}),
	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators(TodoActions,dispatch)
	)(App);