import * as React from "react";

import * as Redux from "Redux";
import * as ReactRedux from "react-redux";

import * as TodoActions from "./actions/todoactions";
import * as EditActions from "./actions/editactions";
import {TodoItem,TodoState} from "./defs/tododefs";
import { EditState } from "./defs/editdefs";

type PostEditBoxProps={text:string,onAccept:(val:string)=>void,onBlur:()=>void};
class PostEditTextBox extends React.Component<PostEditBoxProps,{text:string}> {
	// componentDidMount(){
	// 	this.refs.nameInput
	// }
	constructor(props:PostEditBoxProps) {
		super(props)
		this.state={text:props.text};
	}
	render(){
		const elem=<input autoFocus type="text" value={ this.state.text }
		onChange={  (evt)=>{
			this.setState( { text:evt.target.value });
		} } 
		onKeyDown={ (evt)=>{
			if (evt.keyCode===27) {
				this.props.onBlur();
			}
			if (evt.keyCode==13) {
				this.props.onAccept(this.state.text)
			}
		}}
		onBlur={ (evt)=>{
			this.props.onAccept(this.state.text)
			this.props.onBlur();
		}}
		></input>

		return elem;
	}
}

//(item:TodoItem,msg:string)=>void
class Item extends React.Component<{ item:TodoItem, edit:EditState, actions:typeof TodoActions & typeof EditActions},{}> {
	render() {
		const item=this.props.item;
		
		const nameDisplay=(this.props.edit.textEditItemID===item.id
			?(<PostEditTextBox text={item.name} 
				onAccept={
					(data:string)=>{
						if (data!==item.name)
							this.props.actions.changeText(item,data)
					}
				}
				onBlur={ ()=>{
					this.props.actions.editSetTarget(null)
				} }></PostEditTextBox>)
			:<span onClick={(evt)=>{
				this.props.actions.editSetTarget(item.id)
			}}>[ {item.name} ] </span>);

		return <div key={item.id}>
			{ nameDisplay }
			<input type="checkbox" checked={item.done} onChange={(evt)=>{
				this.props.actions.flipItem(item)
			}}></input>
		</div>
	}
}

let ItemView=ReactRedux.connect(
	(state:{todos:TodoState,edit:EditState})=>({
		items:state.todos.items,
		edit:state.edit
	}),
	(dispatch:Redux.Dispatch)=>({
		actions:Redux.bindActionCreators({...TodoActions,...EditActions},dispatch),
	})
)(class ItemView extends React.Component<{items:TodoItem[],edit:EditState,actions:typeof TodoActions&typeof EditActions},{}> {
	render() {
		return <div style={ { backgroundColor:"#fff3f3" } }>{
			this.props.items.map(
				(item)=><Item key={item.id} item={ item } edit={this.props.edit} actions={ this.props.actions } ></Item>)
		}</div>;
	}
});

class StatusComponent extends React.Component<{status:StatusState,retry:(a:any)=>void},{}>{ // 
	render(){
		const status=this.props.status;
		if (status.failedMessage) {
			// main div fills screen, with flex we can center children vertically easily
			// the child then takes care of horizontal align
			return <div style={ {color:"#ffffff", display:"flex", flexDirection:"column", alignItems:"center",  backgroundColor:"#000000", left:0, top:0, right:0, bottom:0, position:"absolute", opacity:0.4} }>
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