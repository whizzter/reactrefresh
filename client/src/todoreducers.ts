import * as Redux from "Redux";

import TodoConst from "./todoconst";
import {TodoItem,TodoState} from "./tododefs";
import {Action} from "./todoactions";

// our initial application state (testing)
const initialState:TodoState={
	// some faux starter data before we have any network stuff connected!
	items:[
		{id:"fewfwf",name:"Hej",done:true},
		{id:"fef23",name:"Hopp",done:false}
	]
};

export function todoUpdate(state=initialState,action:Action) {
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