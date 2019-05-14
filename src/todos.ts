import * as Redux from "Redux";

import TodoConst from "./todoconst";

export interface TodoItem {
	id:string,
	name:string,
	done:boolean
}

export interface TodoState {
	items:TodoItem[];
}

const initialState:TodoState={
	// some faux starter data before we have any network stuff connected!
	items:[
		{id:"fewfwf",name:"Hej",done:true},
		{id:"fef23",name:"Hopp",done:false}
	]
};

export interface TodoUpdate_Add extends Redux.Action<string> {
	type:TodoConst.ADD;
	data:TodoItem;

};
export interface TodoUpdate_Flip extends Redux.Action<string> {
	type:TodoConst.FLIP;
	id:string;
}

export type TodoUpdate=TodoUpdate_Add|TodoUpdate_Flip;

export function todoUpdate(state=initialState,action:TodoUpdate) {
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
			return state;
		}
	}
}