import * as Redux from "Redux";

import TodoConst from "../const/todoconst";
import {TodoItem,TodoState} from "../defs/tododefs";
import {Action} from "../actions/todoactions";

// our initial application state (testing)
const initialState:TodoState={
	// some faux starter data before we have any network stuff connected!
	items:[
		{id:"fewfwf",name:"CLIENT TODO",done:true},
		{id:"fef23",name:"ITEMS",done:false}
	]
};

export function todoReducer(state=initialState,action:Action) {
	switch(action.type) {
		case TodoConst.ADD : {
			return {...state,items:[...state.items]}
		}
		case TodoConst.FLIP : {
			return {...state,items:state.items.map( item=>{
				return item.id===action.id?{...item,done:!item.done}:item;
			} )}
		}
		default: {
			console.log("Unhandled action:"+(action as any).type);
			return state;
		}
	}
}