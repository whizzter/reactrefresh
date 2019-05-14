import * as Redux from "Redux";

export enum TODOActions {
	ADD = "ADD_TODO",
	FLIP = "FLIP_TODO"
};

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
	type:TODOActions.ADD;
	data:TodoItem;

};
export interface TodoUpdate_Flip extends Redux.Action<string> {
	type:TODOActions.FLIP;
	id:string;
}

export type TodoUpdate=TodoUpdate_Add|TodoUpdate_Flip;

export function todoUpdate(state=initialState,action:TodoUpdate) {
	switch(action.type) {
		case TODOActions.ADD : {
			return {...state,items:[...state.items]}
		}
		case TODOActions.FLIP : {
			return {...state,items:state.items.map( item=>{
				return item.id===action.id?{...item,done:!item.done}:item;
			} )}
		}
		default: {
			return state;
		}
	}
}