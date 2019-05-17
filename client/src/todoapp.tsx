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


let ItemView=ReactRedux.connect(
	(state:{todos:TodoState})=>({
		items:state.todos.items
	}),
	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators(TodoActions,dispatch)
)(class ItemView extends React.Component<{items:TodoItem[],flipItem:(id:string)=>void},{}> {
	render() {
		return <div style={ { backgroundColor:"#fff3f3" } }>{
			this.props.items.map(
				(item)=><Item key={item.id} { ...item } flipItem={ this.props.flipItem } ></Item>)
		}</div>;
	}
});

class StatusComponent extends React.Component<{status:StatusState,retry:(a:any)=>void},{}>{ // 
	render(){
		const status=this.props.status;
		if (status.failedMessage) {
			// main div fills screen, with flex we can center children vertically easily
			// the child then takes care of horizontal align
			return <div style={ {color:"#ffffff", display:"flex", alignItems:"center",  backgroundColor:"#000000", left:0, top:0, right:0, bottom:0, position:"absolute", opacity:0.4} }>
				<div style={ {textAlign:"center", left:0, right:0, width:"100%",position:"relative" } }>[{ status.failedMessage }]</div>
				<button onClick={ (ev)=>{
					this.props.retry( status.failedAction )
				} } >Retry?</button>
			</div>
		} else if (status.loading) {
			// main div fills screen, with flex we can center children vertically easily
			// the child then takes care of horizontal align
			return <div style={ {color:"#ffffff", display:"flex", alignItems:"center",  backgroundColor:"#000000", left:0, top:0, right:0, bottom:0, position:"absolute", opacity:0.4} }>
				<div style={ {textAlign:"center", left:0, right:0, width:"100%",position:"relative" } }>[{ status.loading }]</div>
			</div>
		} else {
			return null; // do not render anyhing as a status
		}
	}
}

import {StatusState} from "./defs/statusdefs";
import * as StatusActions from "./actions/statusactions";

export let StatusContainer=ReactRedux.connect(
	(state:{status:StatusState}) => ({
		status:state.status
	}),
	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators(StatusActions,dispatch)
)(
	StatusComponent
);

export class App extends React.Component<{name:string},{}> {
	render() {
		return <div>{this.props.name}  app component! 
			<ItemView/>
		</div>
	}
};


// export default ReactRedux.connect(
// 	(state:{todos:TodoState})=>({
// 		items:state.todos.items
// 	}),
// 	(dispatch:Redux.Dispatch)=>Redux.bindActionCreators(TodoActions,dispatch)
// 	)(App);