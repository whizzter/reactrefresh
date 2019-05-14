import * as React from "react";

import * as Redux from "Redux";
import * as ReactRedux from "react-redux";

import * as Model from "./todos";
import TodoConst from "./todoconst";

class Item extends React.Component<Model.TodoItem & { flipItem:(id:string)=>void },{}> {
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
class App extends React.Component<{name:string,items:Model.TodoItem[],flipItem:(id:string)=>void},{}> {
	render() {
		return <div>{this.props.name}  app component! <div style={ { backgroundColor:"#fff3f3" } }>{
			this.props.items.map(
				(item)=><Item key={item.id} { ...item } flipItem={ this.props.flipItem } ></Item>)
		}</div></div>
	}
};


export default ReactRedux.connect(
	(state:{todos:Model.TodoState})=>({
		items:state.todos.items
	}),
	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators({
		addItem:(item:Model.TodoItem)=>({type:TodoConst.ADD,data:item}),
		flipItem:(id:string)=>({type:TodoConst.FLIP,id})
	},dispatch)
	)(App);