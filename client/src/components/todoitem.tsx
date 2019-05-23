import * as React from "react";

import * as TodoActions from "../actions/todoactions";
import * as EditActions from "../actions/editactions";
import {TodoItem,TodoState} from "../defs/tododefs";
import { EditState } from "../defs/editdefs";

import FocusTextInput from "./focustextinput"

export default class TodoItemComponent extends React.Component<{ item:TodoItem, edit:EditState, actions:typeof TodoActions & typeof EditActions},{}> {
	render() {
		const item=this.props.item;
		
		const nameDisplay=(this.props.edit.textEditItemID===item.id
			?(<FocusTextInput text={item.name} 
				onAccept={
					(data:string)=>{
						if (data!==item.name)
							this.props.actions.changeText(item,data)
					}
				}
				onBlur={ ()=>{
					this.props.actions.editSetTarget(null)
				} } />)
			:<span onClick={(evt)=>{
				this.props.actions.editSetTarget(item.id)
			}}>[ {item.name} ] </span>);

		return <div key={item.id}>
			{ nameDisplay }
			<input type="checkbox" checked={item.done} onChange={(evt)=>{
				this.props.actions.flipItem(item)
			}}/>
		</div>
	}
}
